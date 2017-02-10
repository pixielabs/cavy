import React, {Component} from 'react';
import { View, ListView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ActionBar from './ActionBar';
import EmployeeListItem from './EmployeeListItem';
import * as employeeService from './services/employee-service-mock';

export default class EmployeeDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})};
    employeeService.findById(this.props.data.id).then(employee => {
      this.setState({
        employee: employee,
        dataSource: this.state.dataSource.cloneWithRows(employee.reports)
      });
    });
  }

  openManager() {
    this.props.navigator.push({name: 'details', data: this.state.employee.manager});
  }

  render() {
    if (this.state && this.state.employee) {
      let employee = this.state.employee;
      let manager;
      if (employee.manager) {
        manager = <TouchableOpacity style={styles.manager} onPress={this.openManager.bind(this)}>
                  <Image source={{uri: employee.manager.picture}} style={styles.smallPicture} />
                  <Text style={styles.lightText}>{employee.manager.firstName} {employee.manager.lastName}</Text>
                  <Text style={styles.lightText}>{employee.manager.title}</Text>
                  </TouchableOpacity>;
      }
      let directReports;
      if (employee.reports && employee.reports.length > 0) {
        directReports =
          <ListView style={styles.list}
                    dataSource={this.state.dataSource}
                    enableEmptySections={true}
                    renderRow={(data) => <EmployeeListItem navigator={this.props.navigator} data={data} />}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          />;
      } else {
        directReports = <View style={styles.emptyList}><Text style={styles.lightText}>No direct reports</Text></View>;
      }
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            {manager}
            <Image source={{uri: employee.picture}} style={styles.picture} />
            <Text style={styles.bigText}>{employee.firstName} {employee.lastName}</Text>
            <Text style={[styles.mediumText, styles.lightText]}>{employee.title}</Text>
            <ActionBar mobilePhone={employee.mobilePhone} email={employee.email} />
          </View>
          {directReports}
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#FAFAFF',
    paddingBottom: 4,
    borderBottomColor: '#F2F2F7',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  manager: {
    paddingBottom: 10,
    alignItems: 'center'
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
  mediumText: {
    fontSize: 16,
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
