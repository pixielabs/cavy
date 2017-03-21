import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';

import {testHook} from './helpers/cavy.js';
import GLOBAL from './helpers/globals.js';

class EmployeeListItem extends Component {

  showDetails() {
    this.props.navigator.push({name: 'details', data: this.props.data});
  }

  render() {
    const { generateTestHook, data } = this.props;

    return (
      <TouchableHighlight ref={GLOBAL.TEST_ENABLED ? generateTestHook(`EmployeeListItem.${data.firstName}${data.lastName}`): (`${data.firstName}${data.lastName}`)} onPress={this.showDetails.bind(this)} underlayColor={'#EEEEEE'}>
        <View style={styles.container}>
          <Image source={{uri: data.picture}} style={styles.picture} />
          <View>
            <Text>{data.firstName} {data.lastName}</Text>
            <Text style={styles.title}>{this.props.data.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

export default testHook(EmployeeListItem);

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
