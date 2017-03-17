import * as itAction from './itActions.js';

// TEST VARIABLES //

const TEST_EMPLOYEE = 'AnupGupta';
const SEARCH = 'Anup';
const TEST_EMPLOYEE2 = 'AmyTaylor';
const SEARCH2 = 'Amy';

// TEST SUITES //

export const verifyAndSearch = (spec) => {
  spec.suite('Verify Anup and search Amy', () => {
    itAction.clearTextInput(spec);
    itAction.presenceEmployeeListItem(spec, TEST_EMPLOYEE);
    itAction.inputSearchBarTextInput(spec, SEARCH2, TEST_EMPLOYEE2);
    itAction.inputSearchBarClearText(spec);
  });
};

export const verifyActionBarEmail = (spec) => {
  spec.suite('Search Amy and verify contact button exists', () => {
    itAction.presenceActionBarEmailButton(spec);
  });
};

export const secretPresence = (spec) => {
  spec.suite('Use secret component to continue testing past OS alert', () => {
    itAction.secretShowDetails(spec);
  });
};

export const secretSearch = (spec) => {
  spec.suite('Use secret component to enter text into search box', () => {
    itAction.secretSearch(spec);
  });
};

export const runFailures = (spec) => {
  spec.suite('Run a few failing tests', () => {
    itAction.failure(spec);
    itAction.pause(spec, 1000);
    itAction.failure(spec);
  });
};