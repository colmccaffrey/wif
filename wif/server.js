var fs = require('fs');
var path = require('path');
var express = require('express');
// var routes = require('./routes/index');
// var about = require('./routes/about');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/bechdel.json', function(req, res) {
	fs.readFile('bechdel.json', function(err, data) {
		res.setHeader('Cache-Control', 'no-cache');
		res.json(JSON.parse(data));
	});
});






app.listen(app.get('port'), function() {
	console.log('Listening on' + app.get('port') + '/');
});