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
      ref={refName} onPress={() => {onPressIn(); console.log('root shit');}}>
      <View />
    </TouchableOpacity>
);

TestHook.propTypes = {
  onPressIn: React.PropTypes.func.isRequired,
  refName: React.PropTypes.any.isRequired
};


const _SecretPresenceAction = ({onSecretSearch, generateTestHook}) => (
  <TestHook
    onPressIn={() => onSecreatSearch}
    refName={generateTestHook('secretPresenceAction')}
  />
);

_SecretPresenceAction.PropTypes = {
  dispatch: React.PropTypes.func.isRequired,
  generateTestHook: React.PropTypes.func.isRequired,
};

export const SecretPresenceAction = testWrapHook(_SecretPresenceAction);

