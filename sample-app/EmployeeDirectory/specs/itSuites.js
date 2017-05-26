import * as itSpec from './itSpecs.js';

// TEST VARIABLES //

const TEST_EMPLOYEE = 'AnupGupta';
const SEARCH = 'Anup';
const TEST_EMPLOYEE2 = 'AmyTaylor';
const SEARCH2 = 'Amy';

// TEST SUITES //

export const filterEmployeeList = (spec) => {
  spec.suite('Verify Anup and search Amy', () => {
    itSpec.presenceEmployeeListItem(spec, TEST_EMPLOYEE);
    itSpec.presenceEmployeeListItem(spec, TEST_EMPLOYEE2);
    itSpec.inputSearchBar(spec, SEARCH2);
    itSpec.notPresenceEmployeeListItem(spec, TEST_EMPLOYEE);
    itSpec.presenceEmployeeListItem(spec, TEST_EMPLOYEE2);
    itSpec.inputSearchBar(spec, ' ');
  });
};

export const tapAndEmail = (spec) => {
  spec.suite('Filter for amy & verify EmailButton exists', () => {
    itSpec.inputSearchBar(spec, SEARCH2);
    itSpec.pressEmployeeRow(spec, TEST_EMPLOYEE2);
    itSpec.presenceActionBarEmailButton(spec);
    itSpec.navigateToEmployeeList(spec);
  });
};