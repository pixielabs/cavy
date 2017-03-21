import React, { Component } from 'react';
import {AppRegistry} from 'react-native';

import { Tester, TestHookStore } from 'cavy';

import EmployeeDirectoryApp from './app/EmployeeDirectoryApp';

import GLOBAL from './app/helpers/globals.js';

if (GLOBAL.TEST_ENABLED) {
  var testHookStore = new TestHookStore();
  var testSuites = require('./specs/itSuites.js');
  var testSuitesArray = [testSuites.filterEmployeeList, testSuites.tapAndEmail];
}

class AppWrapper extends Component {
  render() {
    if (GLOBAL.TEST_ENABLED) {
      return (
        <Tester 
          suites={testSuitesArray} 
          store={testHookStore} 
          waitTime={1000}
          testStartDelay={1000}
          consoleLog={true} // {false}, {true}, 'verbose'
        >
          <EmployeeDirectoryApp />
        </Tester>
      );
    } else {
      return (<EmployeeDirectoryApp />);
    }
  }
}

AppRegistry.registerComponent('EmployeeDirectory', () => AppWrapper);
