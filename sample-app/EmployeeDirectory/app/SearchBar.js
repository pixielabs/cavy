import React, { PureComponent } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import GLOBAL from './helpers/globals.js';
import { testHook } from './helpers/cavy.js';
import { SecretSearch } from '../specs/itTestComponents.js';

class SearchBar extends PureComponent {
  constructor() {
    super();
    this.state = {
      value: ''
    };
  }

  _onChangeText(value) {
    this.setState({value});
    this.props.onChange(value);
  }

  _onSecretSearch() {
    this.setState({value: 'foobar SECRET SEARCH'});
    this.props.onChange('foobar SECRET SEARCH');
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          ref={GLOBAL.TEST_ENABLED ? this.props.generateTestHook('SearchBar.TextInput') : 'textinput'}
          style={styles.input}
          placeholder="Search"
          onChangeText={(value) => this._onChangeText(value)}
          value={this.state.value}
        />
        {GLOBAL.TEST_ENABLED ? <SecretSearch onSecretSearch={() => this._onSecretSearch()} generateTestHook={this.props.generateTestHook} /> : null}
      </View>
    );
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

