import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
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
// startDelay        - An integer representing the time in milliseconds before
//                     test execution begins.
// clearAsyncStorage - A boolean to determine whether to clear AsyncStorage
//                     between each test. Defaults to `false`.
// sendReport        - Boolean, set this to `true` to have Cavy try and
//                     send a report to cavy-cli. Set to `false` by
//                     default.
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
    }
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
    const scope = new TestScope(this, this.props.waitTime, this.props.startDelay,
      this.props.sendReport);
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
  startDelay: PropTypes.number,
  clearAsyncStorage: PropTypes.bool,
  sendReport: PropTypes.bool
};

Tester.childContextTypes = {
  testHooks: PropTypes.instanceOf(TestHookStore)
};

Tester.defaultProps = {
  waitTime: 2000,
  startDelay: 0,
  clearAsyncStorage: false,
  sendReport: false
};
