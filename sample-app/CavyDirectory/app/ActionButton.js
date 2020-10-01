import React from 'react';
import { Text, Image, StyleSheet, Pressable } from 'react-native';

export default function ActionButton({ text, icon, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.action}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.actionText}>{text}</Text>
    </Pressable>
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
