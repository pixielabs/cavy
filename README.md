This documentation is still in progress.

# Cavy

An integration test framework for React Native, by
[Pixie Labs](http://pixielabs.io).

## Installation

To get started using Cavy, install it using `yarn`:

    yarn add cavy --dev

or `npm`:

    npm i --save-dev cavy

## Basic usage

### Hook up components for testing

Add 'hooks' to any components you want to test by adding a `ref` and using the `generateTestHook` function.

`generateTestHook` takes a string as its first argument - this is the identifier
to be used in tests. It takes an optional second argument in case you want to
set your own `ref` generating function.

Stateless functional components cannot be assigned a `ref` since they don't have
instances. Use the `wrap` function to wrap them inside a non-stateless component.

```javascript
import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { FuncComponent } from 'somewhere';

import { hook, wrap } from 'cavy';

class Scene extends Component {
  render() {
    const WrappedComponent = wrap(FuncComponent);
    return (
      <TextInput
        ref={this.props.generateTestHook('Scene.TextInput')}
        onChangeText={...}
      />
      <WrappedComponent
        ref={this.props.generateTestHook('Scene.Component')}
        onPress={...}
      />
    );
  }
}

const TestableScene = hook(Scene);
export default TestableScene;
```

### Write your test cases

Using your component identifiers, write your spec functions. We suggest saving
these in a spec folder such as `./specs/AppSpec`.

```javascript
export default function(spec) {
  spec.describe('My feature', function() {
    spec.it('works', async function() {
      await spec.fillIn('Scene.TextInput', 'some string')
      await spec.press('Scene.button');
      await spec.exists('NextScene')
    });
  });
}
```

### Set up your test wrapper

Import `Tester`, `TestHookStore` and your specs in `index.ios.js` and/or
`index.android.js`, and instantiate a new `TestHookStore`.

Wrap your app in a Tester component, passing in the `testHookStore` and an array
containing your spec functions.

```javascript
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Tester, TestHookStore } from 'cavy';
import AppSpec from './specs/AppSpec';
import App from './app';

const testHookStore = new TestHookStore();

export default class AppWrapper extends Component {
  render() {
    return (
      <Tester specs={[AppSpec]} store={testHookStore}>
        <App />
      </Tester>
    );
  }
}

AppRegistry.registerComponent('AppWrapper', () => AppWrapper);
```

**Congratulations! You are now all set up to start testing your app with Cavy.**

Your tests will run automatically when you run your app using either:

    $ react-native run-ios

or

    $ react-native run-android

## Contributing

- Check out the latest master to make sure the feature hasn't been implemented
  or the bug hasn't been fixed yet.
- Check out the issue tracker to make sure someone already hasn't requested it
  and/or contributed it.
- Fork the project.
- Start a feature/bugfix branch.
- Commit and push until you are happy with your contribution.
- Please try not to mess with the package.json, version, or history. If you
  want to have your own version, or is otherwise necessary, that is fine, but
  please isolate to its own commit so we can cherry-pick around it.
