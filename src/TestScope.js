import {postTestResults} from './reporting/api';
import Reporters from './reporting/reporters';
import {has, omit} from 'lodash';

// Internal: Wrapper around an app being tested, and a bunch of test cases.
//
// The TestScope also includes all the functions available when writing your
// spec files.

class ComponentNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ComponentNotFoundError';
  }
}

export default class TestScope {

  constructor(component, waitTime, testStartDelay=false, consoleLog=false, reporter=false, notifier=false) {
    this.component = component;
    this.testHooks = component.testHookStore;
    this.waitTime = waitTime;
    this.testStartDelay = testStartDelay;
    this.consoleLog = consoleLog;
    if (reporter) {
      this.reporter = new Reporters[reporter]();
    } else { this.reporter = false; }
    this.notifier = notifier;
    this.testSuites = {};

    this.run.bind(this);
  }

  // Internal: Synchronously run each test case one after the other, outputting
  // on the console if the test case passes or fails. Also resets the app
  // after each test case by changing the component key to force React to
  // re-render the entire component tree.
  async run() {

    let start = new Date();
    if (this.reporter) {this.reporter.testStart = start;}
    this._handleConsoleLog('Cavy tests started at' + start);

    if (this.testStartDelay) {
      this.pause(this.testStartDelay);
    }

    let suiteKeys = Object.keys(this.testSuites);
    for (let testSuiteIdx in suiteKeys) {
      let testSuite = this.testSuites[suiteKeys[testSuiteIdx]];
      let suiteStats = {};

      suiteStats.start = new Date();
      this._handleConsoleLog(suiteKeys[testSuiteIdx] + ' suite started at ' + suiteStats.start);

      let caseKeys = Object.keys(testSuite);
      for (let testCaseIdx in caseKeys) {
        let testCase = testSuite[caseKeys[testCaseIdx]];
        let caseStats = {};
        let caseResult = {};

        let {expected, f} = testCase;
        let description = caseKeys[testCaseIdx];

        try {
          caseStats.start = new Date();
          await f.call(this);
          caseStats.finish = new Date();

          this._handleConsoleLog(`${description}  ✅\n    Expected: ${expected}\n    Actual: PASS`);
          
          caseResult = {
            expected: expected,
            actual: 'PASS'
          };

        } catch (e) {
          caseStats.finish = new Date();

          this._handleConsoleLog(`${description}  ❌\n    Expected: ${expected}\n    Actual: FAIL\n    Error: ${e.message}`, false, true);
          caseResult = {
            expected: expected,
            actual: 'FAIL',
            error: e.message
          };
        }

        await this.component.clearAsync();
        this.component.reRender();

        caseStats.duration = (caseStats.finish - caseStats.start)/1000;

        let noF = omit(testCase, 'f');
        testSuite[caseKeys[testCaseIdx]] = {...noF, ...caseStats, ...caseResult};

        this._handleConsoleLog({description, caseStats}, true);
      }

      suiteStats.stop = new Date();
      suiteStats.duration = (suiteStats.stop - suiteStats.start)/1000;

      this._handleConsoleLog('Suite stopped at ' + suiteStats.stop);
      this._handleConsoleLog({suiteStats}, true);
    }

    let finish = new Date();

    if (this.reporter) {
      this.reporter.testFinish = finish;
      this.reporter.addTestResults(this.testSuites);
      this._handleNotify(this.reporter.generateReport());
    }

    this._handleConsoleLog('Cavy tests finished at' + finish);
    this._handleConsoleLog(this.testSuites);
  }

  // Internal: Handle reporting to console based on consoleLog prop
  //
  // log     - String, log to send to console
  // verbose - Conditional [boolean, sring], controls report output.
  //              false - no logging
  //              true - logging
  //              verbose - log all
  // warn    - Use console.warn instead of console.log
  //
  _handleConsoleLog(log, verbose=false, warn=false) {
    if (this.consoleLog) {
      if (verbose) {
        this.consoleLog === 'verbose' ? warn ? console.warn(log) : console.log(log) : null;
      } else  {
        warn ? console.warn(log) : console.log(log);
      }
    }
  }

  // Internal: Handle notifying webhook on test completion
  //
  // testReport - Test report object
  //
  _handleNotify(testReport) {
    if (this.notifier) {
      console.log('handle notify');
      postTestResults(testReport, this.notifier);
    }
  }

  // Public: Find a component by its test hook identifier. Waits
  // this.waitTime for the component to appear before abandoning.
  //
  // Usually, you'll want to use `exists` instead.
  //
  // identifier - String, component identifier registered in the test hook store
  //              via `generateTestHook`.
  //
  // Example
  //
  //   import { assert } from 'assert';
  //   const c = await spec.findComponent('MyScene.myComponent');
  //   assert(c, 'Component is missing');
  //
  // Returns a promise; use `await` when calling this function. Resolves the
  // promise if the component is found, rejects the promise after
  // this.waitTime if the component is never found in the test hook
  // store.
  findComponent(identifier) {
    let promise = new Promise((resolve, reject) => {
      let startTime = Date.now();
      let loop = setInterval(() => {
        const component = this.testHooks.get(identifier);
        if (component) {
          clearInterval(loop);
          return resolve(component);
        } else {
          if (Date.now() - startTime >= this.waitTime) {
            reject(new ComponentNotFoundError(`Could not find component with identifier ${identifier}`));
            clearInterval(loop);
          }
        }
      }, 100);
    });

    return promise;
  }

  // Public: Build a suite of test specs.
  //
  // label - Label for the test suite.
  // f     - Callback function containing your tests cases defined with `it`.
  suite(label, f) {
    if (!has(this.testSuites, label)) {
      this.testSuites[label] = {};
    }
    this.activeSuiteKey = label;

    f.call(this);
  }

  // Public: Build up a group of test cases.
  //
  // label - Label for these test cases.
  // f     - Callback function containing your tests cases defined with `it`.
  //
  // Example
  //
  //   // specs/MyFeatureSpec.js
  //   export default function(spec) {
  //     spec.describe('My Scene', function() {
  //
  //       spec.it('Has a component', async function() {
  //         await spec.exists('MyScene.myComponent');
  //       });
  //
  //     });
  //   }
  //
  // Returns undefined.
  describe(label, f) {
    this.describeLabel = label;
    f.call(this);
  }

  // Public: Define expected result from test case
  //
  // expected - Expected result from the test.
  // f        - The test case.
  //
  // See example above.
  it(expected, f) {
    this.testSuites[this.activeSuiteKey][this.describeLabel] = {expected, f};
  }

  // Public: Fill in a `TextInput`-compatible component with a string value.
  // Your component should respond to the property `onChangeText`.
  //
  // identifier - Identifier for the component.
  // str        - String to fill in.
  //
  // Returns a promise, use await when calling this function. Promise will be
  // rejected if the component is not found.
  async fillIn(identifier, str) {
    const component =  await this.findComponent(identifier);
    component.props.onChangeText(str);
  }

  // Public: 'Press' a component (e.g. a `<Button />`).
  // Your component should respond to the property `onPress`.
  //
  // identifier - Identifier for the component.
  //
  // Returns a promise, use await when calling this function. Promise will be
  // rejected if the component is not found.
  async press(identifier) {
    const component = await this.findComponent(identifier);
    component.props.onPress();
  }

  // Public: Pause the test for a specified length of time, perhaps to allow
  // time for a request response to be received.
  //
  // time - Integer length of time to pause for (in milliseconds).
  //
  // Returns a promise, use await when calling this function.
  async pause(time) {
    let promise = new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve();
      }, time);
    });

    return promise;
  }

  // Public: Check a component exists.
  //
  // identifier - Identifier for the component.
  //
  // Returns a promise, use await when calling this function. Promise will be
  // rejected if component is not found, otherwise will be resolved with
  // `true`.
  async exists(identifier) {
    const component = await this.findComponent(identifier);
    return !!component;
  }

  // Public: Check for the absence of a component. Will potentially halt your
  // test for your maximum wait time.
  //
  // identifier - Identifier for the component.
  async notExists(identifier) {
    try {
      await this.findComponent(identifier);
    } catch(e) {
      if (e.name == 'ComponentNotFoundError') {
        return true;
      }
      throw e;
    }
    throw new Error(`Component with identifier ${identifier} was present`);
  }
}