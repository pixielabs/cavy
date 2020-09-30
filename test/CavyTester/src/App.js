import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { useCavy } from 'cavy';

import scenarios from './scenarios';

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

// Wrap our app in the Tester component, containing all our test scenarios.
export default App = () => <AppContainer />;