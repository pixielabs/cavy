import React from 'react';
import cavy from "./generateTestHook";
import wrap, {isNotReactClass, } from "./wrap";

// Public: Drop in replacement for React.createElement that let cavy
// to hook into element creation reducing normal code impact
// directly collecting component refs when the cavyIdProp is set.
// It automatically wraps function components to add forwardRef
//
// If you configure this in you project the code goes from this:
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
// to this:
//
// import React from 'react';
// import { View, Text } from 'react-native';
//
// export default ({ data }) => {//
//   return (
//     <View>
//       <TestableText cavyTestId="title">
//         {data.title}
//       </TestableText>
//     </View>
//   )
// };
//
// Eve if the configuration is a bit invasive (replace of jsx transpilation)
// it is simple and keeps you src code more free from cavy implementation
//

// Configuration of jsx element creation
let pragmaConfig = {
  testHookStore: null,
  cavyIdPropName: 'cavyTestId'
};

// Should be called at the startup of you index.test.js
//import { setJSXConfig } from 'cavy-jsx';
//
// const testHookStore = new TestHookStore();
//
// setJSXConfig({
//    testHookStore,
//    cavyIdPropName: 'yourPropNameForCavyId'
// });
//
export function setJSXConfig(userConfig) {
  if(!userConfig || !userConfig.testHookStore){
    throw new Error(`You must set testHookStore in pragma config`);
  }
  pragmaConfig = {...pragmaConfig, ...userConfig};
}

//
// Simple wrapper of React.createElement that handles element with [cavyIdPropName]
// wrapping function component and collecting its reference in cavy
//
export default function cavyCreateElement(componentType, props, children) {

  // Check it the jsx config has been set
  if(!pragmaConfig || !pragmaConfig.testHookStore  || pragmaConfig.cavyIdPropName){
    throw new Error('Configure JSX pragma before using it');
  }
  // Handle only elements with [cavyIdPropName] set
  if (pragmaConfig.cavyIdPropName in props) {
    const generateTestHook = cavy(pragmaConfig.testHookStore);
    let WrappedType = componentType;
    // Auto wraps function components
    if (typeof componentType === 'function' && isNotReactClass(componentType)) {
      WrappedType = wrap(componentType);
    }
    let newProps;
    if( 'ref' in props){
      // If the ref is already set keep it and ads identifier to cavy
      newProps = { ...props, ref: generateTestHook(props[pragmaConfig.cavyIdPropName], props.ref) };
    }else {
      // Otherwise just add identifier
      newProps = { ...props, ref: generateTestHook(props[pragmaConfig.cavyIdPropName]) };
    }
    return React.createElement(WrappedType, newProps, children);
  }

  return React.createElement.apply(undefined, arguments);
}

// JSX replacement must also contains fragment
export const Fragment = React.Fragment;
