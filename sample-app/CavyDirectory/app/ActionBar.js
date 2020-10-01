import React, { Component } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { hook, wrap } from 'cavy';

import ActionButton from './ActionButton';

class ActionBar extends Component {
  callNumber() {
    this.openURL('tel:' + this.props.mobilePhone);
  }

  sendMessage() {
    this.openURL('sms:' + this.props.mobilePhone);
  }

  sendMail() {
    this.openURL('mailto:' + this.props.email);
  }

  openURL(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    const TestableActionButton = wrap(ActionButton);

    return (
      <View style={styles.container}>
        <TestableActionButton
          ref={this.props.generateTestHook('ActionBar.EmailButton')}
          text="email" icon={require('./assets/email.png')}
          onPress={this.sendMail.bind(this)} />
        <ActionButton
          text="call"
          icon={require('./assets/call.png')}
          onPress={this.callNumber.bind(this)} />
        <ActionButton
          text="message"
          icon={require('./assets/sms.png')}
          onPress={this.sendMessage.bind(this)} />
      </View>
    );
  }
}

export default hook(ActionBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FAFAFF',
    paddingVertical: 8
  }
});
