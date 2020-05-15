import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import PropTypes from 'prop-types';

import TestHookStore from './TestHookStore';
import { TesterContext } from './Tester';
import generateTestHook from './generateTestHook';

// Public: Higher-order React component to factilitate adding hooks to the
// global test hook store. Once you've hooked your main component (see example
// below), you can set an inner component's ref with `this.props.generateTestHook`
// to add it to the testHookStore for later use in a spec.
//
// React will call `generateTestHook` twice during the render lifecycle; once to
// 'unset' the ref, and once to set it.
//
// WrappedComponent - Component to be wrapped, will be passed an initial
//                    property called 'generateTestHook' which is a function
//                    generator that will add a component to the testHookStore.
//
// Example
//
//   import { hook } from 'cavy';
//
//   class MyComponent extends React.Component {
//
//     render() {
//       const { generateTestHook } = this.props;
//       return (
//         <TextInput
//           ref={generateTestHook('MyComponent.textinput', (c) => this.textInput = c)}
//            ...
//         />
//         <Button
//           ref={generateTestHook('MyComponent.button')}
//           title='Press me!'
//         />
//        }
//     }
//   }
//
//   const TestableMyComponent = hook(MyComponent);
//   export default TestableMyComponent;
//
// Returns the new component with the ref generating function generateTestHook as a prop.
export default function hook(WrappedComponent) {
  const WrapperComponent = class extends Component {
    render() {
      const testHookStore = this.context;
      return (
        <WrappedComponent
          generateTestHook={generateTestHook(testHookStore)}
          {...this.props}
        />
      )
    }
  };
  // Set the context type.
  WrapperComponent.contextType = TesterContext;
  // Copy all non-React static methods.
  hoistNonReactStatic(WrapperComponent, WrappedComponent);
  // Wrap the display name for easy debugging.
  WrapperComponent.displayName = `Hook(${getDisplayName(WrappedComponent)})`

  return WrapperComponent;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
