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
      headerBackTitle: null
    }
  },
  EmployeeDetails: {
    screen: EmployeeDetails
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

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#FAFAFF',
    height: 60,
  },
  title: {
    padding: 8,
    fontSize: 16,
    fontWeight: 'bold'
  }
});
