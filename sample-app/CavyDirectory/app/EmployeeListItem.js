import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';

import { useCavy } from 'cavy';

export default ({ data, navigation }) => {
  const generateTestHook = useCavy();
  
  return (
    <TouchableHighlight
      ref={generateTestHook(`${navigation.state.routeName}.${data.firstName}${data.lastName}`)}
      onPress={ () => navigation.navigate('EmployeeDetails', {employeeId: data.id}) }
      underlayColor={'#EEEEEE'}>
      <View style={styles.container}>
        <Image source={{uri: data.picture}} style={styles.picture} />
        <View>
          <Text>{data.firstName} {data.lastName}</Text>
          <Text style={styles.title}>{data.title}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
};

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
