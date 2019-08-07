# CavyTester

The `CavyTester` app exercises the Cavy API in a native mobile environment to test against regressions and make it safer to modify existing features or add new ones.

## Running CavyTester with Cavy in Development

CavyTester can be run on its own to demonstrate Cavy running in a sample React Native app. However, it's also valuable to have it run against a local version of the `cavy` library when testing changes to Cavy itself. To do so, take the following steps:

1. Navigate to the root `cavy` directory (the one whose `package.json` lists `"name": "cavy"`)
2. Execute: `npm link` to make the local version of `cavy` linkable to dependencies
3. Execute: `cd CavyTester`
4. Execute: `npm link cavy` to have `CavyTester` use the linked local version instead of npm's
5. Run the app! (`npm run android` or `npm run ios`)

To make sure you're running the local version of `cavy`, try adding a `console.log('test')` in `cavy/index.js`. When you reload `CavyTester`, you should see `test` printed out in the packager console.

## Adding Tests to Cavy Tester

Adding a new feature to Cavy or just looking to improve end-to-end test coverage? Feel free to add a test : )

To test a new use case or scenario, do the following:

1. Create a new file under `src/scenarios` with a concise name describing your scenario
    - Hint: copying and renaming `src/scenarios/exists.js` will get you most of what you need
2. Export each of the following values from your scenario:
    - `key`: An alphanumeric string identifier for your scenario which will be used for the route key. Usually matches the file name.
    - `Screen`: A React component which renders the UI necessary to exhibit the behavior you're testing.
    - `label`: A short description of your scenario. Used for labeling the scenario in `CavyTester`'s menu.
    - `spec`: A Cavy spec which validates your scenario. Be sure to start your spec by navigating to the scenario screen (`spec.press(key)`).
3. In `src/App.js`, import your scenario and add it to the `scenarios` array

Example `CavyTester` scenario for the `spec.exists` functionality:

```jsx
// exists.js
import React from 'react';
import { Text } from 'react-native';
import { useCavy } from 'cavy';

// `key` is descriptive, concise, and alphanumeric
export const key = 'Exists';

const testId = `${key}.element`; // uses `key` as testId namespace

// `Screen` component is as minimal as necessary to validate scenario
export const Screen = () => {
  const generateTestHook = useCavy();
  return <Text ref={generateTestHook(testId)}>I am text that is present</Text>;
};

// `label` describes the scenario being tested
export const label = 'spec.exists checks for element';

export const spec = spec =>
  // uses `key` for `describe` string
  spec.describe(key, () =>
    // uses `label` for `it` string
    spec.it(label, async () => {
      // initializes spec by navigating to `key` route
      await spec.press(key);

      // validate scenario
      await spec.exists(testId);
    })
  );

```
