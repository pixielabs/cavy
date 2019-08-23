import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Tester, TestHookStore, useCavy } from 'cavy';

import * as exists from './scenarios/exists';
import * as notExists from './scenarios/notExists';
import * as buttonClassComponent from './scenarios/buttonClassComponent';
import * as buttonFunctionComponent from './scenarios/buttonFunctionComponent';
// Import new scenarios here

// Add new scenarios here
const scenarios = [
  exists,
  notExists,
  buttonClassComponent,
  buttonFunctionComponent,
];

// validate scenarios
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

const scenarioRoutes = scenarios.reduce((acc, scenario) => {
  acc[scenario.key] = {
    screen: scenario.Screen,
    navigationOptions: { title: scenario.label },
  };
  return acc;
}, {});

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  ...scenarioRoutes,
});

const AppContainer = createAppContainer(MainNavigator);

const store = new TestHookStore();

const navigateAndRun = (scenario) => {
  console.log('in navigateAndRun')
  return (spec) => {
    // Override `it` so that it presses into the scene for this test first.
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

const App = () => (
  <Tester specs={scenarios.map(x => navigateAndRun(x))} store={store}>
    <AppContainer />
  </Tester>
);

export default App;
