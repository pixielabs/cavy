import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Tester, TestHookStore, useCavy } from 'cavy';

import * as buttonClassComponent from './scenarios/buttonClassComponent';
import * as buttonFunctionComponent from './scenarios/buttonFunctionComponent';
import * as exists from './scenarios/exists';
import * as fillIn from './scenarios/fillIn';
import * as focus from './scenarios/focus';
import * as notExists from './scenarios/notExists';
// Import new scenarios here:

// Add new scenarios here:
const scenarios = [
  buttonClassComponent,
  buttonFunctionComponent,
  exists,
  fillIn,
  focus,
  notExists
];

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

// Create our HomeScreen which contains a button to each of our test scenarios.
const HomeScreen = ({ navigation }) => {
  const generateTestHook = useCavy();
  return (
    <>
      {scenarios.map(scenario => (
        <Button
          key={scenario.key}
          ref={generateTestHook(scenario.key)}
          title={scenario.label}
          onPress={() => navigation.navigate(scenario.key)}
        />
      ))}
    </>
  );
};

// Create a navigation route to each of our test scenarios.
const scenarioRoutes = scenarios.reduce((acc, scenario) => {
  acc[scenario.key] = {
    screen: scenario.Screen,
    navigationOptions: { title: scenario.label },
  };
  return acc;
}, {});

// Our app navigator, containing the navigation to each of our test scenarios.
const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  ...scenarioRoutes,
});

const AppContainer = createAppContainer(MainNavigator);

const store = new TestHookStore();

// Map each of our test scenarios, so that each first navigates to the correct
// scene.
const navigateAndRun = (scenario) => {
  return (spec) => {
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

// Wrap our app in the Tester component, containing all our test scenarios.
const App = () => (
  <Tester specs={scenarios.map(x => navigateAndRun(x))} store={store}>
    <AppContainer />
  </Tester>
);

export default App;
