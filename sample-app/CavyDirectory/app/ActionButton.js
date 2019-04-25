import React from 'react';
import {Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default function ActionButton({text, icon, onPress}) {

  return (
    <TouchableOpacity onPress={onPress} style={styles.action}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.actionText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  action: {
    flex: 1,
    alignItems: 'center'
  },
  actionText: {
    color: '#007AFF'
  },
  icon: {
    height: 20,
    width: 20
  }
});
