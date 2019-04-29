import { useImperativeHandle, forwardRef } from 'react';

// Higher-order component that wraps a function component in `forwardRef()`
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
// functionComponent - The function component you want to test.
//
// Example
//
//   import { Button } from 'react-native-elements';
//   import { hook, wrap } from 'cavy';
//
//   class MyComponent extends React.Component {
//     // ...
//     render() {
//       const WrappedButton = wrap(Button);
//
//       return (
//         <WrappedButton ref={this.generateTestHook('button')} onPress={}/>
//       )
//     }
//   }
//   export default hook(MyComponent);
//
export default function wrap(functionComponent) {
  // `forwardRef` accepts a render function that receives our props and ref.
  return forwardRef((props, ref) => {
    // It returns the wrapped component after calling `useImperativeHandle`, so
    // that our ref can be used to call the inner function component's props.
    useImperativeHandle(ref, () => props);
    return functionComponent(props);
  });
}
