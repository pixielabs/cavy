import React, {Component} from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ActionBar from './ActionBar';
import EmployeeListItem from './EmployeeListItem';
import * as employeeService from './services/employee-service-mock';

export default class EmployeeDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employee: null,
      reports: null
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const employeeId = params ? params.employeeId : null;
    this.fetchData(employeeId);
  }

  fetchData(id) {
    employeeService.findById(id).then(employee => {
      this.setState({
        employee: employee,
        reports: employee.reports
      });
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    if (this.state && this.state.employee) {
      let employee = this.state.employee;
      let manager;
      if (employee.manager) {
        manager = <TouchableOpacity style={styles.manager} onPress={() => navigate('EmployeeDetails', {employeeId: employee.manager.id})}>
                  <Image source={{uri: employee.manager.picture}} style={styles.smallPicture} />
                  <Text style={styles.lightText}>{employee.manager.firstName} {employee.manager.lastName}</Text>
                  <Text style={styles.lightText}>{employee.manager.title}</Text>
                  </TouchableOpacity>;
      }

      let directReports;
      if (employee.reports && employee.reports.length > 0) {
        directReports =
          <FlatList style={styles.list}
                    data={this.state.reports}
                    renderItem={ ({item}) => <EmployeeListItem navigation={this.props.navigation} data={item} /> }
                    ItemSeparatorComponent={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                    keyExtractor={(item, index) => item.id.toString()}
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
