import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import scenarios from './src/scenarios';
import { Tester, TestHookStore } from 'cavy';
const store = new TestHookStore();

// Validate scenarios.
scenarios.forEach(scenario => {
  if (!(scenario.key && scenario.label && scenario.Screen && scenario.spec)) {
    throw Error(
      'CavyTester: key, label, Screen, and spec must be defined for each scenario'
    );
  }
  if (!/^[a-z0-9]+$/i.exec(scenario.key)) {
    throw Error('CavyTester: Scenario keys should be alphanumeric');
  }
});

// Map each of our test scenarios, so that each first navigates to the correct
// scene.
const navigateAndRun = (scenario) => {
  return (spec) => {
    // Override `describe` so that all tests have the 'focus' tag, unless you
    // specifically pass a different tag in.
    const origDescribe = spec.describe;
    spec.describe = (label, f, tag) => {
      const testTag = tag || 'focus';
      origDescribe.call(spec, label, f, testTag)
    }

    // Override `it` so that it first presses into the scene.
    const origIt = spec.it;
    spec.it = (label, f) => {
      origIt.call(spec, label, async () => {
        await spec.press(scenario.key);
        await f();
      });
    };

    scenario.spec(spec);
  }
}

class TestableApp extends Component {
  render() {
    return (
      <Tester
        specs={scenarios.map(x => navigateAndRun(x))}
        store={store}
        only={['focus']} >
        <App />
      </Tester>
    );
  }
}

AppRegistry.registerComponent(appName, () => TestableApp);