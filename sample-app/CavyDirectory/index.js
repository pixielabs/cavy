/**
 * @format
 */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import { Tester, TestHookStore, setJSXConfig } from 'cavy';

import EmployeeDirectoryApp from './app/EmployeeDirectoryApp';

import EmployeeListSpec from './specs/EmployeeListSpec';

const testHookStore = new TestHookStore();

setJSXConfig({
   testHookStore,
   cavyIdPropName: 'yourPropNameForCavyId'
});

class AppWrapper extends Component {
  render() {
    return (
      <Tester specs={[EmployeeListSpec]} store={testHookStore} waitTime={1000}
        startDelay={3000}>
        <EmployeeDirectoryApp />
      </Tester>
    );
  }
}

AppRegistry.registerComponent(appName, () => AppWrapper);
