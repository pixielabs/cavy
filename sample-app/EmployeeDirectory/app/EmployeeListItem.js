import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import { testable } from 'cavy';

const EmployeeListItem = props => (
  <TouchableHighlight
    underlayColor={'#EEEEEE'}
  >
    <View style={styles.container}>
      <Image source={{ uri: props.picture }} style={styles.picture} />
      <View>
        <Text>
          {props.firstName} {props.lastName}
        </Text>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </View>
  </TouchableHighlight>
);

export default testable('EmployeeListItem', 'id')(EmployeeListItem);

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
