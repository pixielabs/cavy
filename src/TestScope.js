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

  constructor(component, testOptions) {
    this.component = component;
    this.testHooks = component.testHookStore;
    this.testSuites = {};

    this.waitTime = testOptions.waitTime;
    this.testStartDelay = testOptions.testStartDelay;
    this.consoleLog = testOptions.consoleLog;

    this.run.bind(this);
  }

  // Internal: Synchronously run each test case one after the other, outputting
  // on the console if the test case passes or fails. Also resets the app
  // after each test case by changing the component key to force React to
  // re-render the entire component tree.
  async run() {

    let start = new Date();
    this._handleConsoleLog('Cavy tests started at ' + start);

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
          
          let actual = 'PASS';

          if (expected === actual) {
            this._handleConsoleLog(this._handlePass(description, expected, actual));
            
            caseResult = {
              expected: expected,
              actual: actual
            };
          } else {
            let error = 'Expected result not equivalent to actual result.';
            this._handleConsoleLog(this._handleFail(description, expected, actual, error), false, true);

            caseResult = {
              expected: expected,
              actual: actual,
              error: error
            };
          }
          
        } catch (e) {
          caseStats.finish = new Date();

          let actual = 'FAIL';

          if (expected === actual) {
            this._handleConsoleLog(this._handlePass(description, expected, actual));
            caseResult = {
              expected: expected,
              actual: actual
            };
          } else {
            this._handleConsoleLog(this._handleFail(description, expected, actual, e.message), false, true);
            caseResult = {
              expected: expected,
              actual: actual,
              error: e.message
            };
          }
        }

        caseStats.duration = (caseStats.finish - caseStats.start)/1000;

        let noF = omit(testCase, 'f');
        testSuite[caseKeys[testCaseIdx]] = {...noF, ...caseStats, ...caseResult};

        this._handleConsoleLog({description, caseStats}, true);
      }

      suiteStats.stop = new Date();
      suiteStats.duration = (suiteStats.stop - suiteStats.start)/1000;

      await this.component.clearAsync();
      this.component.reRender();

      this._handleConsoleLog('Suite stopped at ' + suiteStats.stop);
      this._handleConsoleLog({suiteStats}, true);
    }

    let finish = new Date();

    this._handleConsoleLog('Cavy tests finished at ' + finish);
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
  _handleConsoleLog(log, verbose=false, warn=false) {
    if (this.consoleLog) {
      if (verbose) {
        switch (this.consoleLog) {
        case 'verbose':
          if (warn) {
            console.warn(log);
          } else {
            console.log(log);
          }
          break;
        default:
          break;
        }
      } else {
        switch (warn) {
        case true:
          console.warn(log);
          break;
        case false:
          console.log(log);
          break;
        }
      }
    }
  }

  // Internal: Handle pass test case logging string generation
  //
  // log       - String, test spec description
  // expected  - String, expected test result, one of 'PASS', 'FAIL'
  // actual    - String, actual test result, one of 'PASS', 'FAIL'
  _handlePass(description, expected, actual) {
    return `${description}  ✅\n    Expected: ${expected}\n    Actual: ${actual}`
  }

  // Internal: Handle pass test case logging string generation
  //
  // log       - String, test spec description
  // expected  - String, expected test result, one of 'PASS', 'FAIL'
  // actual    - String, actual test result, one of 'PASS', 'FAIL'
  // error     - String, error message
  _handleFail(description, expected, actual, error) {
    return `${description}  ❌\n    Expected: ${expected}\n    Actual: ${actual}\n    Error: ${error}`
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

  // Public: Build a test suite from N test cases.
  //
  // label - Label for the test suite.
  // f     - Callback function containing your test specs defined with `describe`.
  suite(label, f) {
    if (!has(this.testSuites, label)) {
      this.testSuites[label] = {};
    }
    this.activeSuiteKey = label;

    f.call(this);
  }

  // Public: Build up a test case from a group of test specs.
  //
  // label - Label for this test case.
  // f     - Callback function containing your test specs defined with `it`.
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

  // Public: Define expected result from test spec. Adds the test description as a key
  //         to the testSuite, with an object containing the expected result and callback as 
  //         values.
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
