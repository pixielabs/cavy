/** @format */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import { Tester, TestHookStore } from 'cavy';

import EmployeeDirectoryApp from './app/EmployeeDirectoryApp';

import EmployeeListSpec from './specs/EmployeeListSpec';

const testHookStore = new TestHookStore();

class AppWrapper extends Component {
  render() {
    return (
      <Tester specs={[EmployeeListSpec]} store={testHookStore} waitTime={1000}
        startDelay={3000} sendReport={true}>
        <EmployeeDirectoryApp />
      </Tester>
    );
  }
}

AppRegistry.registerComponent(appName, () => AppWrapper);
