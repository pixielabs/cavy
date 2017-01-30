const DEFAULT_WAIT_TIME = 2000;

// Internal: Wrapper around an app being tested, and a bunch of test cases.
//
// The TestScope also includes all the functions available when writing your
// spec files.
export default class TestScope {

  constructor(component) {
    this.component = component;
    this.testHooks = component.testHookStore;
    this.testCases = [];

    this.run.bind(this);
  }

  // Internal: Synchronously run each test case one after the other, outputting
  // on the console if the test case passes or fails. Also resets the app
  // after each test case by changing the component key to force React to
  // re-render the entire component tree.
  async run() {
    for (let i = 0; i < this.testCases.length; i++) {
      let {description, f} = this.testCases[i];
      try {
        await f.call(this);
        console.log(`${description}  ✅`);
      } catch (e) {
        console.warn(`${description}  ❎\n   ${e.message}`);
      }
      this.component.reRender();
    }
  }

  // Public: Find a component by its test hook identifier. Waits
  // `DEFAULT_WAIT_TIME` for the component to appear before abandoning.
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
  // `DEFAULT_WAIT_TIME` if the component is never found in the test hook
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
          if (Date.now() - startTime >= DEFAULT_WAIT_TIME) {
            reject(new Error(`Could not find component with identifier ${identifier}`));
            clearInterval(loop);
          }
        }
      }, 100);
    });

    return promise;
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

  // Public: Define a test case.
  //
  // label - Label for this test case. This is combined with the label from
  //         `describe` when Cavy outputs to the console.
  // f     - The test case.
  //
  // See example above.
  it(label, f) {
    const description = `${this.describeLabel}: ${label}`;
    this.testCases.push({description, f});
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
}
