const {keys, values, has} = require('lodash');

// Chromium JSON Test Reporter
// https://www.chromium.org/developers/the-json-test-results-format
// 
// Generates Chromium JSON Test Results Format

class ChromiumJSONTestReporting {
  constructor() {
    this.reportJSON = {};
    this.reportStatistics = {};
  }

  set testsStart(formattedTime) {
    this.testStart = formattedTime;
  }

  set testsFinish(formattedTime) {
    this.testFinish = formattedTime;
  }

  addTestResults(testResults) {
    this.reportJSON.suites = {};
    this.reportJSON.suites = testResults;
  }

  _generateTestStatistics() {
    var numFailuresByType = {};
    let suiteKeys = keys(this.reportJSON.suites);
    for (testSuiteIdx in suiteKeys) {
      let testSuite = this.reportJSON.suites[suiteKeys[testSuiteIdx]];
      let caseKeys = keys(testSuite);
      for (testCaseIdx in caseKeys) {
        let testCase = testSuite[caseKeys[testCaseIdx]];
        if (has(testCase, 'error')) {
          if (has(numFailuresByType, testCase.error)) {
            numFailuresByType[testCase.error] += 1;
          };
          numFailuresByType[testCase.error] = 1;
        }
      }
    };
    return numFailuresByType;
  }

  generateReport(interrupted=false, pathDelimiter='/', version=3) {
    return {
      tests: this.reportJSON,
      interrupted: interrupted,
      path_delimiter: pathDelimiter,
      version: version,
      seconds_since_epoch: this.testFinish,
      num_failures_by_type: this._generateTestStatistics()
    };
  }
}

module.exports = {
  ChromiumJSONTestReporting: ChromiumJSONTestReporting
};