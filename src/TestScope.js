// Custom error returned when Cavy cannot find the component in the
// TestHookStore.
class ComponentNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "ComponentNotFoundError";
  }
}

// Custom error returned when a component has not been wrapped, but should have
// been.
class UnwrappedComponentError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnwrappedComponentError";
  }
}

// Internal: TestScope is responsible for building up testCases to be run by
// the TestRunner, and includes all the functions available when writing these
// specs.
//
// component - the Tester component within which the app is wrapped.
// waitTime  - length of time in ms that cavy should wait before giving up on
//             finding a component in the testHookStore.
export default class TestScope {
  constructor(component, waitTime) {
    this.component = component;
    this.testHooks = component.testHookStore;
    this.testCases = [];
    this.waitTime = waitTime;
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
            reject(
              new ComponentNotFoundError(
                `Could not find component with identifier ${identifier}`
              )
            );
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
  // tag   - (Optional) A string tag used to determine whether the group of
  //          tests should run. Defaults to null.
  //
  // Example
  //
  //   // specs/MyFeatureSpec.js
  //   export default function(spec) {
  //     spec.describe('My Scene', function() {
  //       spec.it('Has a component', async function() {
  //         await spec.exists('MyScene.myComponent');
  //       }, 'focus');
  //     });
  //   }
  //
  // Returns undefined.
  describe(label, f, tag = null) {
    this.describeLabel = label;
    this.tag = tag;
    f.call(this);
  }

  // Public: Define a test case.
  //
  // label   - Label for this test case. This is combined with the label from
  //         `describe` when Cavy outputs to the console.
  // f       - The test case.
  // testTag - (Optional) A string tag used to determine whether the individual
  //           test should run. 'Inherits' a tag from its surrounding describe
  //           block (if present) or defaults to null.
  //
  // See example above.
  it(label, f, testTag = null) {
    const tag = this.tag || testTag;
    this.testCases.push({ describeLabel: this.describeLabel, label, f, tag });
  }

  // Public: Runs a function before each test case.
  //
  // f - the function to run
  beforeEach(f) {
    this.beforeEach = f;
  }

  // ACTIONS

  // Public: Fill in a `TextInput`-compatible component with a string value.
  // Your component should respond to the property `onChangeText`.
  //
  // identifier - Identifier for the component.
  // str        - String to fill in.
  //
  // Returns a promise, use await when calling this function. Promise will be
  // rejected if the component is not found.
  async fillIn(identifier, str) {
    const component = await this.findComponent(identifier);
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

  // Public: 'Focus' a component (e.g. a `<TextInput />`).
  // Your component should respond to the property `onFocus`.
  //
  // identifier - Identifier for the component.
  //
  // Returns a promise, use await when calling this function. Promise will be
  // rejected if the component is not found.
  async focus(identifier) {
    const component = await this.findComponent(identifier);
    component.props.onFocus();
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

  // Public: Checks whether a component e.g. <Text> contains the text string
  // as a child.
  //
  // identifier - Identifier for the component.
  // text - String
  //
  // Returns a promise, use await when calling this function. Promise will be
  // rejected if the component is not found.
  async containsText(identifier, text) {
    const component = await this.findComponent(identifier);

    if (component.props === undefined) {
      const msg = "Cannot read property 'children' of undefined.\n" +
        "Are you using `containsText` with a React <Text> component?\n" +
        "If so, you need to `wrap` the component first.\n" +
        "See documentation for Cavy's `wrap` function:" +
        "https://cavy.app/docs/api/test-hooks#example-3";

      throw new UnwrappedComponentError(msg);
    }

    const stringifiedChildren = component.props.children.includes
      ? component.props.children
      : String(component.props.children);

    if (!stringifiedChildren.includes(text)) {
      throw new Error(`Could not find text ${text}`);
    }
  }

  // ASSERTIONS

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
  //
  // Returns a promise, use await when calling this function. Promise will be
  // rejected if the component is not found.
  async notExists(identifier) {
    try {
      await this.findComponent(identifier);
    } catch (e) {
      if (e.name == "ComponentNotFoundError") {
        return true;
      }
      throw e;
    }
    throw new Error(`Component with identifier ${identifier} was present`);
  }
}
