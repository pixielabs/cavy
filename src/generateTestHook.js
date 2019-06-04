// Public: Returns our `generateTestHook` function that in turn returns the ref
// generating function that adds components to the testHookStore.
//
// testHookStore - An instance of a TestHookStore, either from this.context if
// called from within a TesterContext consumer component, or from useContext()
// hook if called from within our own custom useCavy() hook.
//
export default function(testHookStore) {
  // Public: Returns a ref generating function that adds the component itself
  // to the testHookStore for later use in specs.
  //
  // identifier - String, the key the component will be stored under in the
  //              test hook store.
  // f          - Your own ref generating function (optional).
  //
  return function generateTestHook(identifier, f = () => {}) {
    // Returns the component, preserving any user's own ref generating function
    // f(). Adds the component to the testHookStore if defined.
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
  }
};
