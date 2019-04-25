import { useImperativeHandle, forwardRef } from 'react';

// Wrap a stateless (purely functional) component in a
// non-stateless component so that a `ref` can be added.
//
// For example, the react-native-elements <Button /> is purely functional, so
// a ref cannot be assigned and thus it cannot be added to your Cavy test hook
// store.
//
// statelessComponent - The purely functional React component you want to wrap.
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

  const wrappedComponent = function(props, ref) {
    useImperativeHandle(ref, () => props);
    return functionComponent(props);
  };

  return forwardRef(wrappedComponent);
}
