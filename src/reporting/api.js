function handleFailure(failure) {
  console.warn(failure);
}

// Internal: Used by TestScope.js to send a webhook request to a server
//           to notify of test completion. Designed as a basic starting
//           point for integration with CI servers.
//           postTestResults is automatically called if you pass in a 
//           testAPIParams object to Tester.js
//
// testResultJSON        - JSON formatted test result output.
// params                - API Server parameter object
//
//  var testAPIParams = {
//    url: 'http://localhost:3003/jenkins',
//    method: 'POST',
//    headers: {'Content-Type': 'application/json'}
//  };
//

function postTestResults(testResultJSON, params) {
  const headers = new Headers({
    ...params.headers
  });

  const body = {
    testResult: testResultJSON
  };


  const requestParams = {
    method: params.method,
    headers: headers || undefined,
    body: JSON.stringify(body)
  };

  return fetch(params.url, requestParams)
    .then((response) => response.text())
    .then((responseData) => {console.log('responseData', responseData);})
    .catch(handleFailure);
}

module.exports = {
  postTestResults: postTestResults
}