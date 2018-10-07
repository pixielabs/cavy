import React, {Component} from 'react';
import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import EmployeeList from './EmployeeList';
import EmployeeDetails from './EmployeeDetails';

import { hook } from 'cavy';

const RootStack = StackNavigator({
  EmployeeList: {
    screen: EmployeeList,
    navigationOptions: {
      title: 'Employee List',
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: '#FAFAFF',
        height: 60,
      },
      headerTitleStyle: {
        padding: 8,
        fontSize: 18,
        fontWeight: 'bold'
      }
    }
  },
  EmployeeDetails: {
    screen: EmployeeDetails,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#FAFAFF',
        height: 60,
        borderBottomWidth: 0
      }
    }
  }
}, {
  initialRouteName: 'EmployeeList'
});


class EmployeeDirectoryApp extends Component {
  render() {
    return (
      <RootStack />
    )
  }
}

const TestableApp = hook(EmployeeDirectoryApp);
export default TestableApp;
