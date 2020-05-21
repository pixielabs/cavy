// Internal: Reporter is responsible for sending the test results to
// the CLI.
export default class Reporter {
  constructor() {
    // Set the Reporter type to inProgress.
    this.type = 'inProgress';
  }

  // Internal: Creates a websocket connection to the cavy-cli server.
  onStart() {
    const url = 'ws://127.0.0.1:8082/';
    this.ws = new WebSocket(url);
  }

  // Internal: Send a single test result to cavy-cli over the websocket connection.
  send(result) {
    if (this.websocketReady()) {
      testData = { event: 'singleResult', data: result };
      this.sendData(testData);
    }
  }

  // Internal: Send report to cavy-cli over the websocket connection.
  onFinish(report) {
    if (this.websocketReady()) {
      testData = { event: 'testingComplete', data: report };
      this.sendData(testData);
    } else {
      // If cavy-cli is not running, let people know in a friendly way
      const message = "Skipping sending test report to cavy-cli - if you'd " +
      'like information on how to set up cavy-cli, check out the README ' +
      'https://github.com/pixielabs/cavy-cli';

      console.log(message);
    }
  }

  // Private: Determines whether data can be sent over the websocket.
  websocketReady() {
    // WebSocket.readyState 1 means the web socket connection is OPEN.
    return this.ws.readyState == 1;
  }

  // Private: Sends data over the websocket and console logs any errors.
  sendData(testData) {
    try {
      this.ws.send(JSON.stringify(testData));
      if (testData.event == 'testingComplete') {
        console.log('Cavy test report successfully sent to cavy-cli');
      }
    } catch (e) {
      console.group('Error sending test data');
      console.warn(e.message);
      console.groupEnd();
    }
  }
}
