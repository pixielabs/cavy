import React, { Component, Children, PropTypes } from 'react';
import { AsyncStorage } from 'react-native';

import TestHookStore from './TestHookStore';
import TestScope from './TestScope';

import {
  View
} from 'react-native';

// Public: Wrap your entire app in Tester to run tests against that app,
// interacting with registered components in your test cases via the Cavy
// helpers (defined in TestScope).
//
// This component wraps your app inside a <View> to facilitate
// re-rendering with a new key after each test case.
//
// store             - An instance of TestHookStore.
// specs             - An array of spec functions.
// waitTime          - An integer representing the time in milliseconds that
//                     the testing framework should wait for the function
//                     findComponent() to return the 'hooked' component.
// testStartDelay    - Optional pause before test execution begins (ms)
// consoleLog        - Optional/tristate: determine level of console feedback
//                         false: no console.log statements
//                         true: some console.log statements
//                         'verbose': detailed console.log statements  
// reporter          - Optional select reporter formatting for test report output
// notifier          - Optional pass notifier parameters to call webhook on test completion
// clearAsyncStorage - A boolean to determine whether to clear AsyncStorage
//                     between each test. Defaults to `false`.
//
// Example
//
//   import { Tester, TestHookStore } from 'cavy';
//
//   import MyFeatureSpec from './specs/MyFeatureSpec';
//   import OtherFeatureSpec from './specs/OtherFeatureSpec';
//
//   const testHookStore = new TestHookStore();
//
//   export default class AppWrapper extends React.Component {
//     // ....
//     render() {
//       return (
//         <Tester specs={[MyFeatureSpec, OtherFeatureSpec]} store={testHookStore}>
//           <App />
//         </Tester>
//       );
//     }
//   }

export default class Tester extends Component {

  getChildContext() {
    return {
      testHooks: this.testHookStore
    };
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      key: Math.random()
    };
    this.testHookStore = props.store;
  }

  componentDidMount() {
    this.runTests();
  }

  async runTests() {
    let scope = new TestScope(this, this.props.waitTime, this.props.testStartDelay, this.props.consoleLog, this.props.reporter, this.props.notifier);
    for (var i = 0; i < this.props.specs.length; i++) {
      await this.props.specs[i](scope);
    }
    scope.run();
  }

  reRender() {
    this.setState({key: Math.random()});
  }

  async clearAsync() {
    if (this.props.clearAsyncStorage) { 
      try {
        await AsyncStorage.clear();
      } catch(e) {
        console.warn("[Cavy] failed to clear AsyncStorage:", e);
      }
    }
  }

  render() {
    return (
      <View key={this.state.key} style={{flex: 1}}>
        {Children.only(this.props.children)}
      </View>
    );
  }

}

Tester.propTypes = {
  store: PropTypes.instanceOf(TestHookStore),
  specs: PropTypes.arrayOf(PropTypes.func),
  waitTime: PropTypes.number,
  clearAsyncStorage: PropTypes.bool,
  testStartDelay: PropTypes.number,
  consoleLog: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  reporter: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  notifier: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  children: PropTypes.any
};

Tester.childContextTypes = {
  testHooks: PropTypes.instanceOf(TestHookStore)
};

Tester.defaultProps = {
  waitTime: 2000,
  clearAsyncStorage: false
};
