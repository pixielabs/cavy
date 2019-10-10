import React, { useImperativeHandle, forwardRef } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

// With a Function Component:
//
// Higher-order component that wraps a Function Component in `forwardRef()`
// and uses `useImperativeHandle` to make the properties of that component
// available via the component ref so that Cavy can interact directly with it
// via the testHookStore.
//
// More information on forwarding refs:
// <https://reactjs.org/docs/forwarding-refs.html>
//
// More information on `useImperativeHandle`:
// <https://reactjs.org/docs/hooks-reference.html#useimperativehandle>
//
// Example
//
// import React from 'react';
// import { Button } from 'react-native-elements';
// import { useCavy, wrap } from 'cavy';
//
// export default () => {
//   const generateTestHook = useCavy();
//   const TestableButton = wrap(Button);
//
//   return (
//     <TestableButton ref={this.generateTestHook('button')} onPress={}/>
//   )
// };
//
//
//
// With a component like `Text`:
//
// Higher-order component that wraps a native component like `Text`, (neither
// a React Class nor a Function Component), and returns a React Class with
// testable props.
//
// Example:
//
// import React from 'react';
// import { View, Text } from 'react-native';
// import { useCavy, wrap } from 'cavy';
//
// export default ({ data }) => {
//   const generateTestHook = useCavy();
//   const TestableText = wrap(Text);
//
//   return (
//     <View>
//       <TestableText ref={generateTestHook('title')}>
//         {data.title}
//       </TestableText>
//     </View>
//   )
// };
//
export default function wrap(Component) {
  if (typeof Component === 'function' && isNotReactClass(Component)) {
    // `forwardRef` accepts a render function that receives our props and ref.
    return forwardRef((props, ref) => {
      // It returns the wrapped component after calling `useImperativeHandle`, so
      // that our ref can be used to call the inner function component's props.
      useImperativeHandle(ref, () => ({ props }));
      return Component(props);
    });
  }

  // For native components like <Text>, the RN component itself is a plain
  // object, not a function. For these components, the RN renderer returns
  // an instance of `ReactNativeFiberHostComponent`, which does not expose any
  // props. Users should wrap these components - here we're wrapping them and
  // in a class component and exposing testable props.
  if (typeof Component == 'object') {
    class WrapperComponent extends React.Component {
      render() {
        return <Component {...this.props} />
      }
    }
    // Copy all non-React static methods.
    hoistNonReactStatics(WrapperComponent, Component);
    // Wrap the display name for easy debugging.
    WrapperComponent.displayName = `Wrap(${getDisplayName(Component)})`;
    return WrapperComponent;
  }

  const message = "Looks like you're passing a class component into `wrap` - " +
  "you don't need to do this. Attach a Cavy ref to the component itself."

  console.warn(message);
  return Component;
}

// React Class components are also functions, so we need to perform some extra
// checks here. This code is taken from examples in React source code e.g:
//
// https://github.com/facebook/react/blob/12be8938a5d71ffdc21ee7cf770bf1cb63ae038e/packages/react-refresh/src/ReactFreshRuntime.js#L138
function isNotReactClass(Component) {
  return !(Component.prototype && Component.prototype.isReactComponent);
}

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}
