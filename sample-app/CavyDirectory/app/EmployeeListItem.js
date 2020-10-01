import React from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { useCavy, wrap } from 'cavy';

export default ({ data, navigation }) => {
  const generateTestHook = useCavy();
  const WrappedText = wrap(Text);

  const navigateTo = (id) => {
    navigation.navigate('EmployeeDetails', {employeeId: id})
  }

  return (
    <TouchableHighlight
      ref={generateTestHook(`EmployeeList.${data.firstName}${data.lastName}`)}
      onPress={() => navigateTo(data.id)}
      underlayColor={'#EEEEEE'}>
      <View style={styles.container}>
        <Image source={{uri: data.picture}} style={styles.picture} />
        <View>
          <Text>{data.firstName} {data.lastName}</Text>
          <WrappedText
            ref={generateTestHook(`EmployeeList.${data.title}`)}
            style={styles.title}
          >
            {data.title}
          </WrappedText>
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
