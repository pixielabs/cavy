import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import ActionBar from './ActionBar';
import EmployeeListItem from './EmployeeListItem';
import * as employeeService from './services/employee-service-mock';

export default function EmployeeDetails({ navigation, route }) {
  const [employee, setEmployee] = useState(null);
  const [reports, setReports] = useState(null);
  const { params } = route;

  useEffect(() => {
    const employeeId = params ? params.employeeId : null;
    fetchData(employeeId);
  }, [])

  const fetchData = (id) => {
    employeeService.findById(id).then(employee => {
      setEmployee(employee);
      setReports(employee.reports);
    });
  }

  const renderItem = ({ item }) => {
    return <EmployeeListItem navigation={navigation} data={item} />
  }

  const itemSeparator = (_, id) => <View key={id} style={styles.separator} />;

  if (!employee) { return null }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{uri: employee.picture}}
          style={styles.picture} />
        <Text style={styles.bigText}>
          {employee.firstName} {employee.lastName}
        </Text>
        <Text style={styles.lightText}>
          {employee.title}
        </Text>
        <ActionBar mobilePhone={employee.mobilePhone} email={employee.email} />
      </View>
      {employee.reports && employee.reports.length > 0 ?
        <FlatList
          style={styles.list}
          data={reports}
          renderItem={renderItem}
          ItemSeparatorComponent={itemSeparator}
          keyExtractor={(item, _) => item.id.toString()} /> :
        <View style={styles.emptyList}>
          <Text style={styles.lightText}>No direct reports</Text>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingTop: 20
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#FAFAFF',
    paddingBottom: 4,
    borderBottomColor: '#F2F2F7',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  picture: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  smallPicture: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  bigText: {
    fontSize: 20
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#AAAAAA',
  },
  list: {
    flex: 1,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lightText: {
    color: '#C7C7CC'
  }
});
