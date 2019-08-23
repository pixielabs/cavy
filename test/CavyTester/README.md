# CavyTester

The `CavyTester` app exercises the Cavy API in a native mobile environment to
test against regressions and make it safer to modify existing features or add
new ones.

## Running CavyTester with Cavy in Development

CavyTester can be run on its own to demonstrate Cavy running in a sample React
Native app. However, it's also valuable to have it run against a local version
of the `cavy` library when testing changes to Cavy itself. To do so, take the
following steps:

1. Navigate to the root of your local cavy repository.
2. Run `npm link` to link the local version of `cavy` into your system node
   modules.
3. `cd test/CavyTester`
4. Run `npm link cavy` to make `CavyTester` use this local version of `cavy`A.
5. Run the app! (`npm run android` or `npm run ios`)

## Adding Tests to Cavy Tester

1. Create a new file under `src/scenarios` with a concise name describing your
   scenario. You can copy `src/scenarios/exists.js` as a starting point.
2. Export the following variables from your file:
    - `key`: A unique identifier for your set of tests. You can probably just
      use the filename.
    - `Screen`: A React component which renders the UI necessary to exhibit the
      behavior you're testing.
    - `label`: A short description of your scenario. Used for labeling the
      scenario in `CavyTester`'s menu.
    - `spec`: A Cavy spec which validates your scenario.
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
      // validate scenario
      await spec.exists(testId);
    })
  );

```
