import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import { testHook } from './helpers/cavy.js';
import GLOBAL from './helpers/globals.js';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    }
  }

  _onChangeText(value) {
    this.setState({value});
    this.props.onChange(value);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          ref={GLOBAL.TEST_ENABLED ? this.props.generateTestHook('SearchBar.TextInput') : 'TextInput'}
          style={styles.input}
          placeholder="Search"
          onChangeText={(value) => this._onChangeText(value)}
          value={this.state.value}
        />
      </View>
    )
  }
}

export default testHook(SearchBar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C9C9CE',
  },
  input: {
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
});

