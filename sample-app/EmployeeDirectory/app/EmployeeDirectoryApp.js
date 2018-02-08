import React, {Component} from 'react';
import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import EmployeeList from './EmployeeList';
import EmployeeDetails from './EmployeeDetails';

import { hook } from 'cavy';

const RootStack = StackNavigator({
  EmployeeList: {
    screen: EmployeeList,
    navigationOptions: { title: 'Employee List' }
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
  backButton: {
    marginTop: 8,
    marginLeft: 12,
    height: 24,
    width: 24
  },
  title: {
    padding: 8,
    fontSize: 16,
    fontWeight: 'bold'
  }
});
