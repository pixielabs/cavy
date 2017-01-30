import React, { Component, Children, PropTypes } from 'react'
import TestHookStore from './TestHookStore'
import TestScope from './TestScope'

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
// store - An instance of TestHookStore.
// specs - An array of spec functions.
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
    scope = new TestScope(this);
    for (var i = 0; i < this.props.specs.length; i++) {
      await this.props.specs[i](scope);
    }
    scope.run();
  }

  reRender() {
    this.setState({key: Math.random()});
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
  specs: PropTypes.arrayOf(PropTypes.func)
};

Tester.childContextTypes = {
  testHooks: PropTypes.instanceOf(TestHookStore)
}
