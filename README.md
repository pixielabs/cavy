# Cavy

[![npm version](https://badge.fury.io/js/cavy.svg)](https://badge.fury.io/js/cavy)
[![CircleCI](https://circleci.com/gh/pixielabs/cavy.svg?style=svg)](https://circleci.com/gh/pixielabs/cavy)

![Cavy logo](https://cloud.githubusercontent.com/assets/126989/22546798/6cf18938-e936-11e6-933f-da756b9ee7b8.png)

**Cavy** is a cross-platform integration test framework for React Native, by
[Pixie Labs](http://pixielabs.io). You can run tests in-app, or via Cavy's
command line interface **[cavy-cli][cli]**.

This README covers installing and setting up Cavy, writing tests and FAQs.
For information on how to use Cavy's command line interface, check out the
[corresponding README][cli].

## Table of Contents
- [How does it work?](#how-does-it-work)
  - [CLI and continuous integration](#cli-and-continuous-integration)
  - [Where does it fit in?](#where-does-it-fit-in)
- [Installation](#installation)
- [Usage](#usage)
  - [1. Set up the Tester](#1-set-up-the-tester)
  - [2. Hook up components](#2-hook-up-components)
  - [3. Write test cases](#3-write-test-cases)
  - [4. Run tests](#4-run-tests)
  - [Apps that use native code](#apps-that-use-native-code)
- [Available spec helpers](#available-spec-helpers)
- [Writing your own spec helpers](#writing-your-own-spec-helpers)
- [FAQs](#faqs)
- [Contributing](#contributing)

## How does it work?

Cavy (ab)uses React `ref` generating functions to give you the ability to refer
to, and simulate actions upon, deeply nested components within your
application. Unlike a tool like [enzyme](https://github.com/airbnb/enzyme)
which uses a simulated renderer, Cavy runs within your live application as it
is running on a host device (e.g. your Android or iOS simulator).

### CLI and continuous integration

By default, Cavy outputs test results to the console when your app runs.
However, you can also run Cavy tests directly from the command line using
Cavy's own command line interface - [cavy-cli][cli]. Just set the `sendReport`
prop on your `<Tester>` component to `true` (see below).

Further details on how you can use cavy-cli to fully automate your tests with
continuous integration can be found in the [cavy-cli README][cli].

### Where does it fit in?

We built Cavy because, at the time of writing, React Native had only a handful
of testing approaches available:

1. Unit testing components ([Jest](https://github.com/facebook/jest)).
2. Shallow-render testing components ([enzyme](https://github.com/airbnb/enzyme)).
3. Testing within your native environment, using native JS hooks ([Appium](http://appium.io/)).
4. Testing completely within your native environment ([XCTest](https://developer.apple.com/reference/xctest)).

Cavy fits in between shallow-render testing and testing within your native
environment.

## Installation

To get started using Cavy, install it using `yarn`:

    yarn add cavy --dev

or `npm`:

    npm i --save-dev cavy

If you're using TypeScript, you'll also need to install the types package:

    yarn add @types/cavy

## Usage

Check out [the sample app](https://github.com/pixielabs/cavy/tree/master/sample-app/CavyDirectory)
for example usage. Here it is running:

![Sample app running](https://user-images.githubusercontent.com/126989/46629651-8b925e80-cb39-11e8-90b4-23d447d818f9.gif)

### 1. Set up the Tester

Import `Tester`, `TestHookStore` and your specs in your top-level JS file
(typically this is your `index.{ios,android}.js` files). Instantiate a new
`TestHookStore` and render your app inside a `Tester`.

The example below assumes that you are running your tests via
**[cavy-cli][cli]**, and therefore sets the `sendReport` prop to `true`.

```javascript
// index.ios.js

import React, { Component } from 'react';
import { Tester, TestHookStore } from 'cavy';
import AppSpec from './specs/AppSpec';
import App from './app';

const testHookStore = new TestHookStore();

export default class AppWrapper extends Component {
  render() {
    return (
      <Tester specs={[AppSpec]} store={testHookStore} sendReport={true}>
        <App />
      </Tester>
    );
  }
}
```

**Tester props**

| Prop | Type | Description | Default |
| :------------ |:---------------:| :--------------- | :---------------: |
| specs (required) | Array | Your spec functions | - |
| store (required) | TestHookStore | The newly instantiated TestHookStore component | - |
| waitTime | Integer | Time in milliseconds that your tests should wait to find a component | 2000 |
| startDelay | Integer | Time in milliseconds before test execution begins | 0 |
| clearAsyncStorage | Boolean | If true, clears AsyncStorage between each test e.g. to remove a logged in user | false |
| sendReport | Boolean | If true, Cavy sends a report to [cavy-cli][cli] | false |

### 2. Hook up components

To add test hooks to components, first add a ref using the `generateTestHook`
function then export a hooked version of the parent component.

If you need to test a function component, create a testable version of it using
the `wrap` function. Then assign it a ref using `generateTestHook` (see example
below).

`generateTestHook` takes a string as its first argument - this is the
identifier used in tests. It takes an optional second argument in case
you also want to set your own ref generating function.

```javascript
// src/Scene.js

import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { FunctionComponent } from 'some-ui-library';
import { hook, wrap } from 'cavy';

class Scene extends Component {
  render() {
    // If you need to test a function component, use `wrap` so that you can
    // assign it a ref.
    const TestableFunctionComponent = wrap(FunctionComponent);

    return (
      <View>
        <TextInput
          ref={this.props.generateTestHook('Scene.TextInput')}
          onChangeText={...}
        />
        <TestableFunctionComponent
          ref={this.props.generateTestHook('Scene.FunctionComponent')}
          otherProp={...}
        />
      </View>      
    );
  }
}

const TestableScene = hook(Scene);
export default TestableScene;
```

If your component is functional, you can call the custom React Hook `useCavy()`
to obtain a `generateTestHook` function:

```javascript
// src/components/MyComponent.js

import React, { Component } from 'react';
import { View, TextInput } from 'react-native';

import { useCavy } from 'cavy';

export default () => {
  const generateTestHook = useCavy();
  
  return (
    <View>
      <TextInput
        ref={generateTestHook('MyComponent.TextInput')}
        onChangeText={...}
      />
    </View>   
  )
};
```

### 3. Write test cases

Write your spec functions referencing your hooked-up components.
[See below](#available-spec-helpers) for a list of currently available spec
helper functions.

You can use `spec.beforeEach` to call a function before each test runs. The
`beforeEach` function will be called after `AsyncStorage` is cleared but before
the app re-renders and the test is run i.e. the order of actions for each test
execution is:

1. AsyncStorage is cleared (if the `clearAsyncStorage` prop is set to true in
   `Tester`)
2. The `beforeEach` function is called (if defined for this test)
3. The app is re-rendered
4. The test is run

If you need to run shared code at the start of multiple tests _after_ the app
is re-rendered, create your own helper function to call from within your tests.

```javascript
// specs/AppSpec.js

export default function(spec) {

  spec.beforeEach(function() {
    // This function will run before each test in this spec file.
  });

  spec.describe('My feature', function() {
    spec.it('works', async function() {
      await spec.fillIn('Scene.TextInput', 'some string')
      await spec.press('Scene.button');
      await spec.exists('NextScene');
    });
  });
}
```

### 4. Run tests
Congratulations! You are now all set up to start testing your app with Cavy.

Following the set up above, your tests will run automatically when you boot your
app. However, if using [cavy-cli][cli], you can configure your app to only run
tests when initiated through the command line. See the [cavy-cli][cli] README
for further instructions.

### Apps that use native code

If you're not using [Create React Native App][crna], you'll need to register
your `AppWrapper` as the main entry point with `AppRegistry` instead of your
current `App` component:

```javascript
AppRegistry.registerComponent('AppWrapper', () => AppWrapper);
```

## Available spec helpers

| Function | Description |
| :------------ | :--------------- |
| `fillIn(identifier, str)` | Fills in the identified component with the string<br>Component must respond to `onChangeText` |
| `press(identifier)` | Presses the identified component<br>Component must respond to `onPress` |
| `pause(integer)` | Pauses the test for this length of time (milliseconds)<br>Useful if you need to allow time for a response to be received before progressing |
| `exists(identifier)` | Returns `true` if the component can be identified (i.e. is currently on screen) |
| `notExists(identifier)` | As above, but checks for the absence of the component |
| `findComponent(identifier)` | Returns the identified component<br>Can be used if your component doesn't respond to either `onChangeText` or `onPress`<br>For example:<br>```const picker = await spec.findComponent('Scene.modalPicker');```<br>```picker.open();```|

## Writing your own spec helpers

Want to test something not included above? Write your own spec helper function!

Your function will need to be asynchronous and should throw an error in
situations where you want the test to fail. For example, the following tests
whether a `<Text>` component displays the correct text.

```javascript
// specs/helpers.js

export async function containsText(component, text) {
  if (!component.props.children.includes(text)) {
    throw new Error(`Could not find text ${text}`);
  };
}
```
```javascript
// specs/AppSpec.js

import { containsText } from './helpers';

export default function(spec) {
  spec.describe('Changing the text', function() {
    spec.it('works', async function() {
      await spec.press('Scene.button');
      const text = await spec.findComponent('Scene.text');
      await containsText(text, 'you pressed the button');
    });
  });
}
```

## FAQs

#### How does Cavy compare to Appium? What is the benefit?

Cavy is a comparable tool to Appium. The key difference is that Appium uses
native hooks to access components (accessibility IDs), wheras Cavy uses React
Native refs. This means that Cavy sits directly within your React Native
environment (working identically with both Android and iOS builds), making it
easy to integrate into your application very quickly, without much
overhead.

#### What does this allow me to do that Jest does not?

Jest is a useful tool for unit testing individual React Native components,
whereas Cavy is an integration testing tool allowing you to run end-to-end user
interface tests.

#### How about supporting stateless components?

We'd love for Cavy to be better compatible with stateless functional components
and would be more than happy to see its reliance on refs replaced with something
better suited to the task...
What that looks like specifically, we're not 100% sure yet. We're very happy to
discuss possible alternatives!

## Contributing
Before contributing, please read the [code of conduct](CODE_OF_CONDUCT.md).
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

[crna]: https://github.com/react-community/create-react-native-app
[cli]: https://github.com/pixielabs/cavy-cli
