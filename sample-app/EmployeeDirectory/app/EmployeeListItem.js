import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';

import { hook } from 'cavy';

class EmployeeListItem extends Component {

  render() {
    const { state, navigate } = this.props.navigation;
    return (
      <TouchableHighlight
        ref={this.props.generateTestHook(`${state.routeName}.${this.props.data.firstName}${this.props.data.lastName}`)}
        onPress={ () => navigate('EmployeeDetails', {employeeId: this.props.data.id}) }
        underlayColor={'#EEEEEE'}>
        <View style={styles.container}>
          <Image source={{uri: this.props.data.picture}} style={styles.picture} />
          <View>
            <Text>{this.props.data.firstName} {this.props.data.lastName}</Text>
            <Text style={styles.title}>{this.props.data.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

export default hook(EmployeeListItem);

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
