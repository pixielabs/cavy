import React, { PropTypes } from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';

import GLOBAL from './helpers/globals.js';
import {testWrapHook} from './helpers/cavy.js';

const _EmployeeListItem = ({generateTestHook, data, onShowDetails}) => (
    <TouchableHighlight 
    ref={GLOBAL.TEST_ENABLED ? generateTestHook(`EmployeeListItem.${data.firstName}${data.lastName}`): null} 
    onPress={() => {onShowDetails(data);}} 
    underlayColor={'#EEEEEE'}
    >
    <View style={styles.container}>
      <Image source={{uri: data.picture}} style={styles.picture} />
      <View>
        <Text>{data.firstName} {data.lastName}</Text>
        <Text style={styles.title}>{data.title}</Text>
      </View>
    </View>
  </TouchableHighlight>
);

_EmployeeListItem.PropTypes = {
  generateTestHook: PropTypes.func,
  data: PropTypes.object,
  onShowDetails: PropTypes.func
};

export default testWrapHook(_EmployeeListItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 8
  },
  picture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8
  },
  title: {
    color: '#848484'
  }
});
