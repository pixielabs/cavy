# 2.0.0

- Add a `beforeEach` function that can be used on a per-spec basis. Thanks to [PatrickBRT](https://github.com/PatrickBRT) whose work inspired our approach!
- **BREAKING** Clear AsyncStorage and re-render the app before each test runs.
- Cavy no longer resets your app at the end of the test suite.

# 1.1.0

- Un-deprecate `wrap` (was deprecated in 0.6.0) and rewrite it using React
  Hooks. `wrap` is now the accepted way to test function components, replacing
  our previous recommendation to use Recompose's `toClass` (which has been
  deprecated in favour of React Hooks). 🎉

# 1.0.0

- **BREAKING** Drop official support for React Native < 0.59 and React < 16.8.0.
- Update `<Tester>` to use the newer Context API introduced in React 16.3.
- Added a custom [React Hook](https://reactjs.org/docs/hooks-intro.html) called
  `useCavy()` which can be used to access `generateTestHook` from your
  functional components.

This version brings Cavy in line with how people use React nowadays (moving
towards using functional components). However React Hooks were added in React
Native 0.59 and React 16.8.0, so you will need to upgrade your application to
continue to use Cavy from version 1.0.0 onwards. You can continue to use
0.6.2 in the meantime.

If you don't use `useCavy()` Cavy 1.0.0 should work with React Native >= 0.57.5
which was [the earliest version that supported the new Context API](https://github.com/facebook/react-native/issues/21975)
however this is not officially supported.

# 0.6.2

- Fix for when `clearAsyncStorage` option is used but there are no entries in
AsyncStorage. Thanks [haikyuu](https://github.com/haikyuu)!

# 0.6.1

- Update `babel-presets-env` and `.babelrc`.  Thanks
  [eriben](https://github.com/eriben).

# 0.6.0

- Remove `console.warn` when overwriting a component.
- Add deprecation message when calling `wrap`.

# 0.5.0

- Support [cavy-cli](https://github.com/pixielabs/cavy-cli).

cavy-cli is the next step in Cavy's development. With it, we can start to
support Continuous Integration, conditionally running tests, and a bunch of
other cool stuff. Thanks to [Tyler Pate](https://github.com/TGPSKI) whose
suggestions inspired our approach.

# 0.4.1

- Stop using deprecated `PropTypes` and `createClass`. Thanks
  [Mohammed Abu-alsaad](https://github.com/mo-solnet)!
- Fix for when using a wrapped component in a shallow render environment.
  Thanks [Kye Bracey](https://github.com/Kynosaur)!
- Updated documentation for Create React Native App / Expo.

# 0.4.0

- Add optional `startDelay` property to `<Tester>` which delays the test suite
  from beginning once the component is mounted.
- Added a start and end console log line.

With thanks to [Tyler Pate](https://github.com/TGPSKI) for both of these features!

# 0.3.1

- Tweak to the test failure message.

# 0.3.0

- Added the ability to automatically clear the app's entire AsyncStorage
  between test cases. By default, behaviour is unchanged (it does not clear
  it).

# 0.2.0

- Added a `notExists` component assertion.

# 0.1.0

- Added a pause function.
- Configurable wait time when finding components.

# 0.0.2

- Bug fix to ensure that default props are set for wrapped components.

# 0.0.1

- Initial release.
