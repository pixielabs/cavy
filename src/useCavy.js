import React, { useContext } from 'react';
import { TesterContext } from './Tester';

// Public:
//
// Example
//
//   import { useCavy } from 'cavy';
//
//   export default ()  => {
//     // const generateTestHook = useCavy();
//     // return <input ref = { generateTestHook('My.Input') }/>
//   }
//
// Returns the ref generating function for use in functional components.
export default function useCavy() {

  return function(identifier, f = () => {}) {
    const testHookStore = useContext(TesterContext);

    return (component) => {
      if (!testHookStore) {
        f(component);
        return
      }
      if (component) {
        testHookStore.add(identifier, component);
      } else {
        testHookStore.remove(identifier, component);
      }
      f(component);
    }
  };
}
