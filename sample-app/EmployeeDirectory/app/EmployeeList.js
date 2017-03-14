import React, {Component, PropTypes} from 'react';
import {View, ListView, StyleSheet} from 'react-native';
import SearchBar from './SearchBar';
import EmployeeListItem from './EmployeeListItem';
import * as employeeService from './services/employee-service-mock';

import {testHook} from './helpers/cavy.js';

class _EmployeeList extends Component {

  constructor(props) {
    super(props);
    this.state = {dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})};
    employeeService.findAll().then(employees => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(employees)
      });
    });

    this.search = this._search.bind(this);
    this.onShowDetails = this._onShowDetails.bind(this);
  }

  _search(key) {
    employeeService.findByName(key).then(employees => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(employees)
      });
    });
  }

  _onShowDetails(data) {
    this.props.navigator.push({name: 'details', data: data});
  }

  render() {
    const {navigator, generateTestHook} = this.props;

    return (
      <ListView style={styles.container}
        dataSource={this.state.dataSource}
        enableEmptySections={true}
        renderRow={(data) => <EmployeeListItem navigator={navigator} data={data} onShowDetails={(data) => this.onShowDetails(data)} generateTestHook={generateTestHook} />}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        renderHeader={() => <SearchBar onChange={this.search} />}
      />
    );
  }
}

_EmployeeList.PropTypes = {
  navigator: PropTypes.object
};

const EmployeeList = testHook(_EmployeeList);
export default EmployeeList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginTop: 60
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#AAAAAA',
  }
});
