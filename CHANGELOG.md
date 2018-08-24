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
