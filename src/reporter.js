// cavy-cli reporter class.
export default class CavyReporter {
  // Internal: Creates a websocket connection to the cavy-cli server.
  onStart() {
    const url = 'ws://127.0.0.1:8082/';
    this.ws = new WebSocket(url);
  }

  // Internal: Send report to cavy-cli over the websocket connection.
  onFinish(report) {
    // WebSocket.readyState 1 means the web socket connection is OPEN.
    if (this.ws.readyState == 1) {
      try {
        this.ws.send(JSON.stringify(report));
        console.log('Cavy test report successfully sent to cavy-cli');
      } catch (e) {
        console.group('Error sending test results');
        console.warn(e.message);
        console.groupEnd();
      }
    } else {
      // If cavy-cli is not running, let people know in a friendly way
      const message = "Skipping sending test report to cavy-cli - if you'd " +
      'like information on how to set up cavy-cli, check out the README ' +
      'https://github.com/pixielabs/cavy-cli';

      console.log(message);
    }
  }
}