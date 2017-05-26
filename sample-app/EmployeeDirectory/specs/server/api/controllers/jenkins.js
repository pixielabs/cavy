var fetch = require('node-fetch');
var fs = require('fs');
var jsonfile = require('jsonfile');
var mkdirp = require('mkdirp');
var path = require('path');

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

function testCaseToXML(suiteName, testName, testCase) {
  var passed = (testCase.expected == testCase.actual);
  var xml = '    <testcase classname="' + suiteName + '" name="' + testName + '"';

  if (passed) {
    xml += '/>\n';
  } else {
    xml += '>\n      <failure message="Expected ' + testCase.expected +
      ' but got ' + testCase.actual + '">' + testCase.error + '</failure>\n';
    xml += '    </testcase>\n';
  }

  return xml;
}

function testSuiteToXML(suiteName, suite) {
  var numTests = Object.keys(suite).length;
  var xml = '  <testsuite tests="' + numTests.toString() + '">\n';
  for (var testName in suite) {
    xml += testCaseToXML(suiteName, testName, suite[testName]);
  }
  xml += '  </testsuite>\n';
  return xml;
}

function jsonToXUnit(results) {
  var xml = '<?xml version="1.0" encoding="UTF-8"?>\n<testsuites>\n';

  for (var suiteName in results.tests.suites) {
    xml += testSuiteToXML(suiteName, results.tests.suites[suiteName]);
  }

  xml += '</testsuites>\n';
  return xml;
}

// type='xml' => junit report format for use with jenkins
// type='json' => chromium json report format

function writeReport(report, outputDir, type='xml', webhookCallback=false, jsonFileOptions={spaces: 2}) {
  mkdirp(outputDir, err => {
    if (err) {
      return console.log('Error creating path ' + outputDir + '. Reason: ' + err);
    }
  });

  var filename = 'results.' + type;
  var outputFilePath = path.join(outputDir, filename);

  var err_handler = (err => {
    if (err) {
      return console.log('Error writing test results to file: ' + err);
    } else {
      console.log('Test results written to ' + outputFilePath);

      if (webhookCallback) {
        webhookCallback(outputFilePath);
      }
    }
  });

  if (type == 'json') {
    jsonfile.writeFile(outputFilePath, report, jsonFileOptions, err_handler);
  } else {
    fs.writeFile(outputFilePath, report, err_handler);
  }
}

const reporter = 'json';
// reporter='xml' => junit report format for use with jenkins
// reporter='json' => chromium json report format

module.exports = {
  index: (req, res) => {
    var results = Object.assign({}, req.body.testResult);
    console.log(results);
    var outputDir = './specs/server/output/';
    switch (reporter) {
    case 'xml':
      var xunit = jsonToXUnit(results);
      writeReport(xunit, outputDir, 'xml');
      break;
    case 'json':
      writeReport(results, outputDir, 'json');
      break;
    }
    return res.send('Results recorded.');
  },
  webhook: (req, res) => {
    // USED FOR TESTING WEBHOOK FUNCTIONALITY ONLY
    return res.send('Webhook endpoint hit: ' + req.body.outputFileName);
  }
};
