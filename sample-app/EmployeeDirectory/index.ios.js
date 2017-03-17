import React, { PureComponent } from 'react';
import {AppRegistry} from 'react-native';

import { Tester, TestHookStore } from 'cavy';

import EmployeeDirectoryApp from './app/EmployeeDirectoryApp';

import GLOBAL from './app/helpers/globals.js';

if (GLOBAL.TEST_ENABLED) {
  // if (GLOBAL.API_URL !== 'stage') {console.error('You are running tests on prod!')} else {...

  var testHookStore = new TestHookStore();
  console.ignoredYellowBox = ['A component for'];

  var TestSuites = require('./specs/itSuites.js');

  //// Test Suites ////
  // var testSuitesArray = [TestSuites.verifyAndSearch, TestSuites.verifyActionBarEmail, TestSuites.secretPresence, TestSuites.runFailures];
  var testSuitesArray = [TestSuites.secretSearch];
 
  var testApiParams = {
    url: 'http://localhost:3003/jenkins',
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  };
}

class AppWrapper extends PureComponent {
  render() {
    if (GLOBAL.TEST_ENABLED) {
      return (
        <Tester 
          specs={testSuitesArray} 
          store={testHookStore} 
          waitTime={1000}
          testStartDelay={1000}
          consoleLog='verbose' // {false}, {true}, 'verbose'
          reporter='ChromiumJSONTestReporting'
          notifier={testApiParams}
          reRender={true}
        >
        <EmployeeDirectoryApp />
      </Tester>
      );
    } else {
      return (
      <EmployeeDirectoryApp />
      );
    }
  }
}

AppRegistry.registerComponent('EmployeeDirectory', () => AppWrapper);