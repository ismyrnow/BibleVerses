'use strict';

var express = require('express');
var request = require('request');
var argv = require('minimist')(process.argv.slice(2));
var disableAppCache = argv.nocache === true;
var appcache = require('./middleware/appcache')('server/offline.appcache', { disable: disableAppCache });

var app = express();
var apiKey = 'DXYcIp9hDNA2Mw00U7YX9pxIVShJt0l86RFnHxbG';
var port = process.env.PORT || 3000;

app.get('/offline.appcache', appcache);

app.use(express.static(__dirname + '/../public'));

app.get('/api/passage', function (req, res) {
  var reference = req.query['reference'];
  var version = req.query['version'].toUpperCase();

  var url = `https://${apiKey}:X@bibles.org/v2/eng-${version}/passages.js?q[]=${reference}`;

  request({ url: url, json: true }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var passage = extractVerse(body);

      if (passage) {
        res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.end(JSON.stringify(passage));
        return;
      }
    }

    res.writeHead(400);
    res.end();
  });
});

function extractVerse(json) {
  var verse;

  try {
    var passage = json.response.search.result.passages[0];
    verse = {
      reference: passage.display,
      text: cleanPassageText(passage.text),
      version: passage.version_abbreviation
    };
  } catch (e) {
    console.error(e);
  }

  return verse;
}

function cleanPassageText(text) {
  var result = text;

  // Remove superscript text
  // Replacing them with a space, since they tend to occur between verses
  result = result.replace(/<sup.*?\/sup>/gi, ' ');

  // Remove headers
  result = result.replace(/<h\d.*?\/h\d>/gi, '');

  // Remove html tags
  result = result.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi, '');

  // Remove double newlines
  result = result.replace(/\n\n/g, '');

  // Trim space around newlines
  result = result.replace(/\s+\n\s+/g, '\n');

  // Fix quotes
  result = result.replace(/“|”/g, '"');

  // Collapse double spaces
  result = result.replace(/  /g, ' ');

  // Trim whitespace
  result = result.trim();

  return result;
}

app.listen(port);
console.log('Listening on port ' + port);
if (disableAppCache) {
  console.log('AppCache is disabled');
}
