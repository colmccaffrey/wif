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

app.get('/full_bechdel.json', function(req, res) {
	fs.readFile('full_bechdel.json', function(err, data) {
		res.setHeader('Cache-Control', 'no-cache');
		res.json(JSON.parse(data));
	});
});

app.get('/signatures.json', function(req, res) {
	fs.readFile('signatures.json', function(err, data) {
		res.setHeader('Cache-Control', 'no-cache');
		res.json(JSON.parse(data));
	});
});

app.post('/signatures.json', function(req, res){
	fs.readFile('signatures.json', function(err, data){
		var signatures = JSON.parse(data);
		signatures.push(req.body);
		fs.writeFile('signatures.json', JSON.stringify(signatures, null, 4), function(err){
			res.setHeader('Cache-Control', 'no-cache');
			res.json(signatures);
		});
	});
});

app.get('/about', function(req, res){
	res.send("working on about");
})

//*****delete this!!***********
app.get('/test.json', function(req, res) {
	fs.readFile('test.json', function(err, data) {
		res.setHeader('Cache-Control', 'no-cache');
		res.json(JSON.parse(data));
	});
});


app.listen(app.get('port'), function() {
	console.log('Listening on' + app.get('port') + '/');
});