export default class TestRunner {

  constructor(component, testSuites, startDelay, sendReport) {
    this.component = component;
    this.testSuites = testSuites;
    this.startDelay = startDelay;
    this.shouldSendReport = sendReport;
  }

  // Internal: Start tests after optional delay time.
  async run() {
    if (this.startDelay) { await this.pause(this.startDelay)};
    this.runTests();
  }

  // Internal: Synchronously run each test case one after the other, outputting
  // on the console if the test case passes or fails, and adding to testResult
  // array for reporting purposes.
  // Resets the app after each test case by changing the component key to force
  // React to re-render the entire component tree.
  async runTests() {
    let testResults = [];
    let errorCount = 0;

    const start = new Date();
    console.log(`Cavy test suite started at ${start}.`);

    for (let i = 0; i < this.testSuites.length; i++) {

      for (let j = 0; j < this.testSuites[i].testCases.length; j++) {

        let { description, f } = this.testSuites[i].testCases[j];
        try {
          await f.call(this.testSuites[i]);
          let successMsg = `${description}  ✅`;

          console.log(successMsg);
          testResults.push({message: successMsg, passed: true});
        } catch (e) {
          let errorMsg = `${description}  ❌\n   ${e.message}`;

          console.warn(errorMsg);
          testResults.push({message: errorMsg, passed: false});
          errorCount += 1;
        }
        await this.component.clearAsync();
        this.component.reRender();
      }
    }

    const stop = new Date();
    const duration = (stop - start) / 1000;
    console.log(`Cavy test suite stopped at ${stop}, duration: ${duration} seconds.`);

    const report = {
      results: testResults,
      errorCount: errorCount,
      duration: duration
    }

    if (this.shouldSendReport) { await this.sendReport(report) };
  }


  // Internal: Make a post request to the cavy-cli server with the test report.
  sendReport(report) {
    const url = 'http://127.0.0.1:8082/report';
    const options = {
      method: 'POST',
      body: JSON.stringify(report),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return fetch(url, options)
      .then((response) => {
        console.log('Cavy test report successfully sent to cavy-cli');
      })
      .catch((error) => {
        if (error.message.match(/Network request failed/)) {
          console.group(`Cavy test report server is not running at ${url}`);
          console.log("If you are using cavy-cli, maybe it's not set up correctly or not reachable from this device?");
          console.groupEnd();
        } else {
          console.group('Error sending test results')
          console.warn(error.message);
          console.groupEnd();
        }
      });
  }

  // Public: Pause the test for a specified length of time, perhaps to allow
  // time for a request response to be received.
  //
  // time - Integer length of time to pause for (in milliseconds).
  //
  // Returns a promise, use await when calling this function.
  async pause(time) {
    let promise = new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve();
      }, time);
    });

    return promise;
  }

}
