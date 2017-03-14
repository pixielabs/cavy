import React, { PureComponent } from 'react';
import {AppRegistry} from 'react-native';

import { Tester, TestHookStore } from 'cavy';

import EmployeeDirectoryApp from './app/EmployeeDirectoryApp';

import GLOBAL from './app/helpers/globals.js';

if (GLOBAL.TEST_ENABLED) {
  var testHookStore = new TestHookStore();

  var TestSuites = require('./specs/itSuites.js');
  // var TestSuitesArray = [TestSuites.verifyAndSearch, TestSuites.verifyActionBarEmail, TestSuites.secretPresence, TestSuites.criticalTests];
  // , 
  var TestSuitesArray = [TestSuites.verifyAndSearch, TestSuites.verifyActionBarEmail, TestSuites.secretPresence, TestSuites.runFailures];
 
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
          specs={TestSuitesArray} 
          store={testHookStore} 
          waitTime={1000}
          testStartDelay={1000}
          consoleLog='verbose' //{false}, {true}, 'verbose'
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