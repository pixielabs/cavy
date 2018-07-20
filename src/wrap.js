import createReactClass from 'create-react-class';

// Deprecated: Wrap a stateless (purely functional) component in a
// non-stateless component so that a `ref` can be added.
//
// Cavy's wrap(statelessComponent) is deprecated. We suggest using Recompose's
// `toClass` helper function instead.
// See: https://github.com/acdlite/recompose#build-your-own-libraries
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
export default function wrap(statelessComponent) {
  console.log("Cavy's wrap function is deprecated and will be removed in 1.0.0. Please use Recompose's `toClass` instead. https://github.com/acdlite/recompose#build-your-own-libraries");

  var reactClass = {};

  Object.keys(statelessComponent).forEach(function (key) {
    reactClass[key] = statelessComponent[key];
  });

  if (statelessComponent.defaultProps) {
    reactClass.getDefaultProps = function() {
      return statelessComponent.defaultProps;
    }
  }

  reactClass.displayName = statelessComponent.name || statelessComponent.displayName;
  reactClass.render = function() {
    return statelessComponent(this.props, this.context);
  };

  return createReactClass(reactClass);
}
