import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'

import SearchBar from './SearchBar'
import EmployeeListItem from './EmployeeListItem'
import * as employeeService from './services/employee-service-mock'

export default function EmployeeList({ navigation }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    employeeService.findAll().then(employees => setData(employees));
  }, [])

  const search = (key) => {
    employeeService.findByName(key).then(employees => setData(employees));
  }

  const renderItem = ({ item }) => {
    return <EmployeeListItem navigation={navigation} data={item} />;
  }

  const itemSeparator = (_, id) => <View key={id} style={styles.separator} />;

  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={itemSeparator}
      ListHeaderComponent={<SearchBar onChange={search} />}
      keyExtractor={(item, _) => item.id.toString()} />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF'
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#AAAAAA',
  }
});
