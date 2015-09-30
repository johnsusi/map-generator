var config = require('./package.json');
var request = require('request');
var fs = require('fs');

require('dotenv').load();

console.log(config.version);

var file_name  = config.name + '-' + config.version + '.tgz'
var asset_name = config.name + '-v' + process.version +
                 '-' + process.platform + '-' + process.arch + '.tgz'

var api_url = "https://api.github.com/repos/" + config.repository + '/releases/tags/v' + config.version;

var req = request.get({
  url: api_url,
  headers: {
    'User-Agent': config.author,
    'Accept': 'application/vnd.github.v3+json'
  },
  auth: {
    pass: 'x-oauth-basic',
    user: process.env['GITHUB_OAUTH_TOKEN']
  },
  json: true,
}, function (err, res, body) {
  if (err) {
    console.error(err);
    return process.exit(-1);
  }
  console.log(body);

  console.log(body.upload_url.replace(/\{\?.*\}/,''));
  fs.createReadStream(file_name).pipe( request.post({
    url: body.upload_url.replace(/\{\?.*\}/,''),
    headers: {
      'User-Agent': config.author,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/octet-stream',
      'Content-Length': fs.statSync(file_name).size
    },
    auth: {
      pass: 'x-oauth-basic',
      user: process.env['GITHUB_OAUTH_TOKEN']
    },
    json: true,
    qs: {
      name: asset_name
    }
  }, function (err, res, body) {
    if (err) {
      console.error(err);
      return process.exit(-1);
    }
    console.log(body);

  }) );

});
