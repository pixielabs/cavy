import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import SearchBar from './SearchBar';
import EmployeeListItem from './EmployeeListItem';
import * as employeeService from './services/employee-service-mock';

export default class EmployeeList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    employeeService.findAll().then(employees => {
      this.setState({
        data: employees
      });
    });
  }

  search(key) {
    employeeService.findByName(key).then(employees => {
      this.setState({
        data: employees
      });
    });
  }

  render() {
    return (
      <FlatList style={styles.container}
                data={this.state.data}
                renderItem={ ({item}) => <EmployeeListItem navigation={this.props.navigation} data={item} /> }
                ItemSeparatorComponent={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                ListHeaderComponent={() => <SearchBar onChange={this.search.bind(this)} />}
                keyExtractor={(item, index) => item.id.toString()}
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
