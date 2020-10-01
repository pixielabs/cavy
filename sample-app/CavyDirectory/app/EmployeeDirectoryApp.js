import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import EmployeeList from './EmployeeList'
import EmployeeDetails from './EmployeeDetails'

const Stack = createStackNavigator();

export default function EmployeeDirectoryApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EmployeeList">
        <Stack.Screen
          name="EmployeeList"
          component={EmployeeList}
          options={{
            title: 'Employee List',
            headerBackTitle: null,
            headerStyle: {
              backgroundColor: '#FAFAFF',
              height: 100,
            },
            headerTitleStyle: {
              padding: 8,
              fontSize: 18,
              fontWeight: 'bold'
            }
          }}/>
        <Stack.Screen
          name="EmployeeDetails"
          component={EmployeeDetails}
          options={{
            title: null,
            headerStyle: {
              backgroundColor: '#FAFAFF',
              height: 100,
              borderBottomWidth: 0
            }
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}