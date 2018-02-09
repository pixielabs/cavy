import React, {Component} from 'react';
import {View, ListView, StyleSheet} from 'react-native';
import SearchBar from './SearchBar';
import EmployeeListItem from './EmployeeListItem';
import * as employeeService from './services/employee-service-mock';

export default class EmployeeList extends Component {

  constructor(props) {
    super(props);
    this.state = {dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})};
    employeeService.findAll().then(employees => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(employees)
      });
    });
  }

  search(key) {
    employeeService.findByName(key).then(employees => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(employees)
      });
    });
  }

  render() {
    return (
      <ListView style={styles.container}
                dataSource={this.state.dataSource}
                enableEmptySections={true}
                renderRow={(data) => <EmployeeListItem navigator={this.props.navigator} data={data} />}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                renderHeader={() => <SearchBar onChange={this.search.bind(this)} />}
      />
    );
  }
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
