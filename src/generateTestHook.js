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
  // f          - Your own ref generating function or ref (optional).
  //
  return function generateTestHook(identifier, ref) {
    // Returns the component, preserving any user's own ref generating function
    // f() or ref attribute created via React.createRef.
    // Adds the component to the testHookStore if defined.

    const registerRef = (component) => {
      // support for callback refs
      if (typeof ref == 'function') {
        ref(component);
      }
      // support for createRef and useRef
      if (ref && typeof ref == 'object') {
        ref.current = component;
      }
    }
    return (component) => {
      if (!testHookStore) {
        return registerRef(component)
      }

      if (component) {
        testHookStore.add(identifier, component);
      } else {
        testHookStore.remove(identifier);
      }

      return registerRef(component)
    }
  }
};
