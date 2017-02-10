import React, {Component} from 'react';
import {Navigator, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import EmployeeList from './EmployeeList';
import EmployeeDetails from './EmployeeDetails';

import { hook } from 'cavy';

class EmployeeDirectoryApp extends Component {

  renderScene(route, navigator) {
    switch (route.name) {
      case 'employee-list':
        return <EmployeeList navigator={navigator} />
      case 'details':
        return <EmployeeDetails navigator={navigator} data={route.data} />
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'employee-list', title: 'Employee List'}}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) => {
                if (route.name === 'employee-list') {
                  return null;
                } else {
                  return (
                    <TouchableOpacity onPress={() => navigator.pop()}>
                      <Image source={require('./assets/back.png')} style={styles.backButton} />
                    </TouchableOpacity>
                  );
                }
              },
              RightButton: (route, navigator, index, navState) => {
                return null;
              },
              Title: (route, navigator, index, navState) => {
                return (<Text style={styles.title}>{route.title}</Text>);
              },
            }}
            style={styles.navBar}
          />
        }
      />
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
