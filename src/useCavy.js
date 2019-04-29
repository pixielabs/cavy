import React, { useContext } from 'react';
import { TesterContext } from './Tester';
import generateTestHook from './generateTestHook';

// Public: Call `useCavy()` in a functional component. This returns a function
// that you can pass into inner components' refs to add that component to the
// testHookStore for later use in specs.
//
// Example
//
//   import { useCavy } from 'cavy';
//
//   export default ()  => {
//     const generateTestHook = useCavy();
//     return <input ref = { generateTestHook('My.Input') }/>
//   }
//
// Returns the ref generating function for use in functional components.
export default function useCavy() {
  const testHookStore = useContext(TesterContext);
  return generateTestHook(testHookStore);
}
