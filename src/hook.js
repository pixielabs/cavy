import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';

import TestHookStore from './TestHookStore';

// Public: Higher-order React component to factilitate adding hooks to the
// global test hook store.
//
// WrappedComponent - Component to be wrapped, will be passed an initial
//                    property called 'generateTestHook' which is a function
//                    generator that will add a component to the test hook
//                    store.
//
// Example
//
//   import { hook } from 'cavy';
//
//   class MyComponent extends React.Component {
//     // ....
//   }
//
//   const TestableMyComponent = hook(MyComponent);
//   export default TestableMyComponent;
//
// Returns the new component.
export default function hook(WrappedComponent) {
  const wrapperComponent = class extends Component {

    constructor(props, context) {
      super(props, context);
      this.generateTestHook = this.generateTestHook.bind(this);
    }

    // Public: Call `this.props.generateTestHook` in a ref within your
    // component to add it to the test hook store for later use in a spec.
    //
    // React calls this function twice during the render lifecycle; once to
    // 'unset' the ref, and once to set it.
    //
    // identifier - String, the key the component will be stored under in the
    //              test hook store.
    // f          - Your own ref generating function (optional).
    //
    // Examples
    //
    //   <TextInput
    //     ref={this.props.generateTestHook('MyComponent.textinput', (c) => this.textInput = c)}
    //     // ...
    //   />
    //
    //   <Button
    //     ref={this.props.generateTestHook('MyComponent.button')}
    //     title="Press me!"
    //   />
    //
    // Returns the ref-generating anonymous function which will be called by
    // React.
    generateTestHook(identifier, f = () => {}) {
      return (component) => {
        if (!this.context.testHooks) {
          f(component)
          return
        }
        if (component) {
          this.context.testHooks.add(identifier, component);
        } else {
          this.context.testHooks.remove(identifier, component);
        }
        f(component);
      }
    }

    render() {
      return <WrappedComponent generateTestHook={this.generateTestHook} {...this.props} />;
    }
  }

  wrapperComponent.contextTypes = {
    testHooks: PropTypes.instanceOf(TestHookStore)
  }

  return hoistStatics(wrapperComponent, WrappedComponent);
}
