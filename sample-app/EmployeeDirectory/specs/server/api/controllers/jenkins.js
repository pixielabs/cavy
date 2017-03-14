var fetch = require('node-fetch');
var jsonfile = require('jsonfile');

var results = {};
var outputFileName = '';

function handleFailure(failure) {
  console.log(failure);
}

const webhookConfig = outputFileName => {
  return {
    url: 'http://localhost:3003/jenkins/webhook',
    body: { outputFileName: outputFileName }
  };
};

function getFormattedDate() {
  // Minor mods from: http://stackoverflow.com/a/32062237
  var date = new Date();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  month = (month < 10 ? '0' : '') + month;
  day = (day < 10 ? '0' : '') + day;
  hour = (hour < 10 ? '0' : '') + hour;
  min = (min < 10 ? '0' : '') + min;
  sec = (sec < 10 ? '0' : '') + sec;
  var str = date.getFullYear() + '-' + month + '-' + day + '_' + hour + '_' + min + '_' + sec;
  return str;
}

function postTestCompleteWebhook(params) {
  fetch(params.url, {
    method: 'PUT',
    body: JSON.stringify(params.body),
    headers: { 'Content-Type': 'application/json' }
  })
    .catch(err => handleFailure(err))
    .then(function(res) {
      return res.text();
    })
    .then(function(text) {
      console.log(text);
    });
}

function writeReport(reportJSON, outputFilePath, webhookCallback=false, jsonFileOptions={spaces: 2}) {
  jsonfile.writeFile(outputFilePath, reportJSON, jsonFileOptions, err => {
    if (err) {
      return console.log('Error writing test results to file: ' + err);
    } else {
      console.log('Test results written to ' + outputFilePath);
      if (webhookCallback) {
        webhookCallback(outputFilePath);
      }
    }
  });
}

module.exports = {
  index: (req, res) => {
    results = {};
    outputFileName = 'testResults_' + getFormattedDate() + '.json';
    results = Object.assign({}, req.body.testResult);
    console.log(results);
    writeReport(results, './specs/server/output/' + outputFileName);
    return res.send('Results recorded.');
  },
  webhook: (req, res) => {
    // USED FOR TESTING WEBHOOK FUNCTIONALITY ONLY
    return res.send('Webhook endpoint hit: ' + req.body.outputFileName);
  }
};