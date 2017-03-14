import * as itAction from './itActions.js';

// TEST VARIABLES //

const TEST_EMPLOYEE = 'AnupGupta';
const SEARCH = 'Anup';
const TEST_EMPLOYEE2 = 'AmyTaylor';
const SEARCH2 = 'Amy';

// TEST SUITES //

export const verifyAndSearch = (spec) => {
  spec.suite('Verify Anup and search Amy', () => {
    itAction.presenceEmployeeListItem(spec, TEST_EMPLOYEE);
    itAction.inputSearchBarTextInput(spec, SEARCH2);
    itAction.notPresenceEmployeeListItem(spec, TEST_EMPLOYEE);
    itAction.presenceEmployeeListItem(spec, TEST_EMPLOYEE2);
  });
};

export const verifyActionBarEmail = (spec) => {
  spec.suite('Search Amy and verify contact button exists', () => {
    itAction.inputSearchBarTextInput(spec, SEARCH2);
    itAction.presenceActionBarEmailButton(spec, TEST_EMPLOYEE2);
  });
};

export const secretPresence = (spec) => {
  spec.suite('Use secret component to continue testing past OS alert', () => {
    itAction.secretPresenceActionBar(spec);
  });
};

export const criticalTests = (spec) => {
  spec.suite('Run critical integration tests.', () => {
    itAction.presenceActionBarEmailButton(spec, SEARCH);
    itAction.secretPresenceActionBar(spec);
  });
};