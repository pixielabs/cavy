import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View
// $FlowIgnore
} from 'react-native';

import {testWrapHook} from '../app/helpers/cavy.js';

const TestHookStyles = StyleSheet.create({
  invisibleContainer: {
    width: 0,
    height: 0, 
    flex: 0
  }
});

const TestHook = ({refName, onPressIn}) => (
    <TouchableOpacity style={TestHookStyles.invisibleContainer}
      ref={refName} onPress={() => onPressIn()}>
      <View />
    </TouchableOpacity>
);

TestHook.propTypes = {
  onPressIn: React.PropTypes.func.isRequired,
  refName: React.PropTypes.any.isRequired
};

const alertBypassData = {
  email: "james@fakemail.com",
  firstName: "James",
  id: 5,
  lastName: "Kennedy",
  managerName: "Caroline Kingsley",
  mobilePhone: "617-987-6543",
  phone: "617-123-4567",
  picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/james_kennedy.jpg",
  title: "Account Executive"
};

const _SecretShowDetails = ({onSecretShowDetails, generateTestHook}) => (
  <TestHook
    onPressIn={() => onSecretShowDetails(alertBypassData)}
    refName={generateTestHook('SecretShowDetails')}
  />
);

_SecretShowDetails.PropTypes = {
  onSecretShowDetails: React.PropTypes.func.isRequired,
  generateTestHook: React.PropTypes.func.isRequired,
};

export const SecretShowDetails = testWrapHook(_SecretShowDetails);

