import React from 'react'
import { Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useCavy } from 'cavy'

import scenarios from './scenarios'

const Stack = createStackNavigator();

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

// Our app navigator, containing the navigation to each of our test scenarios.
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen} />

        {/* Create a navigation route to each of our test scenarios. */}
        {scenarios.map(scenario => {
          return (
            <Stack.Screen
              name={scenario.key}
              component={scenario.Screen}
              options={{ title: scenario.label }} />
          )
        })}
      </Stack.Navigator>
    </NavigationContainer>
  )
}