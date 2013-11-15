var express = require('express');
var util = require('util');
var request = require('request');

var app = express();
var apiKey = 'DXYcIp9hDNA2Mw00U7YX9pxIVShJt0l86RFnHxbG';
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/api/passage', function (req, res) {
	var reference = req.query['reference'];
	var version = req.query['version'];

	var url = util.format('https://%s:X@bibles.org/v2/passages.js?q[]=%s&version=%s',
		apiKey, reference, version);

	request(url).pipe(res);
});

app.listen(port);
console.log('Listening on port ' + port);