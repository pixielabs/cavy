// cavy-cli reporter function.

// Internal: Check that cavy-cli server is running and if so, send report.
export default async function(report) {
  const url = 'http://127.0.0.1:8082/';

  try {
    const response = await fetch(url);
    const text = await response.text();

    if (text == 'cavy-cli running') {
      return send(report);
    } else {
      throw new Error('Unexpected response');
    }
  } catch (e) {
    console.log(`Skipping sending test report to cavy-cli - ${e.message}.`)
  }
}

// Internal: Make a post request to the cavy-cli server with the test report.
async function send(report) {
  const url = 'http://127.0.0.1:8082/report';

  const options = {
    method: 'POST',
    body: JSON.stringify(report),
    headers: { 'Content-Type': 'application/json' }
  };

  try {
    await fetch(url, options);
    console.log('Cavy test report successfully sent to cavy-cli');
  } catch (e) {
    if (e.message.match(/Network request failed/)) {
      console.group(`Cavy test report server is not running at ${url}`);
      console.log("If you are using cavy-cli, maybe it's not set up correctly or not reachable from this device?");
      console.groupEnd();
    } else {
      console.group('Error sending test results')
      console.warn(error.message);
      console.groupEnd();
    }
  }
}
