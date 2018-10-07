/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { Tester, TestHookStore } from 'cavy';

import EmployeeDirectoryApp from './app/EmployeeDirectoryApp';

import EmployeeListSpec from './specs/EmployeeListSpec';

const testHookStore = new TestHookStore();

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
