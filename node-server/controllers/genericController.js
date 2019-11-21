const request = require('request');
const env = require('../../src/environments/env')
let baseUrl = env.nodeServiceUrl;

let getServiceData = function(req, res) {
  var headers = req.headers;
  console.log('Base Url: ', baseUrl + req.url);
  alert('hiiiiii');
  var options = {
    url: baseUrl + req.url,
    method: 'GET',
    headers: headers,
    json: true
  };
  request(options, function(error, response, body) {
    console.log('Response: ', body);
    res.send(body);
  });
};

let postServiceData = function(req, res) {
  var headers = req.headers;
  var options = {
    url: baseUrl + req.url,
    method: 'POST',
    headers: headers,
    json: true,
    body: req.body
  };
  request(options).on('error', function(err) {
    console.log('Log Time: ', Date.now());
    console.log('Error from service: ', err);
    res.status(500).send(err);
  })
  .pipe(res);
};

module.exports = { getServiceData, postServiceData };