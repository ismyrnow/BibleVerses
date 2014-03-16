var express = require('express');
var util = require('util');
var request = require('request');

var app = express();
var apiKey = 'DXYcIp9hDNA2Mw00U7YX9pxIVShJt0l86RFnHxbG';
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get("/offline.appcache", function(req, res){
  res.contentType("text/cache-manifest");
  res.end("CACHE MANIFEST");
});

app.get('/api/passage', function (req, res) {
	var reference = req.query['reference'];
	var version = req.query['version'].toUpperCase();

	var url = util.format('https://%s:X@bibles.org/v2/eng-%s/passages.js?q[]=%s',
		apiKey, version, reference);

	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var passage = extractVerse(JSON.parse(body));

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
		var verse = {
			reference: passage.display,
			text: cleanPassageText(passage.text),
			version: passage.version_abbreviation
		};
	} catch (e) {}

	return verse;
}

function cleanPassageText(text) {
	var result = text.replace(/<sup.*?\/sup>/gi, '');
	result = result.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi, '')

	return result;
}

app.listen(port);
console.log('Listening on port ' + port);