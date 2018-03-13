import { toClass } from "recompose";

// Public: Wrap a stateless (purely functional) component in a non-stateless
// component so that a `ref` can be added.
//
// For example, the react-native-elements <Button /> is purely functional, so
// a ref cannot be assigned and thus it cannot be added to your Cavy test hook
// store.
//
// statelessComponent - The purely functional React component you want to wrap.
//
// Example
//
//   import {
//     Button
//   } from 'react-native-elements';
//   import { wrap } from 'cavy';
//
//   class MyComponent extends React.Component {
//     // ...
//     render() {
//       const wrappedButton = wrap(Button);
//
//       // ...
//     }
//   }
export default toClass;
