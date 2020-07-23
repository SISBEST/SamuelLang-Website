var express = require('express');
var fs = require('fs');
var exphbs = require('express-handlebars');
var app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('static'));

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/get', (req, res) => {
	res.render('get');
});

app.get('/repl', (req, res) => {
	res.render('repl');
});

app.get('/contribute', (req, res) => {
	res.render('contribute');
});

app.get('/packages', (req, res) => {
	res.render('packages/index');
});

app.get('/packages/:name', (req, res) => {
	res.render('packages/info', {
		name: req.params.name
	});
});

app.get('/docs', (req, res) => {
	res.render('docs/index');
});

app.get('/docs/:page', (req, res) => {
	res.render('docs/' + req.params.page);
});

app.use(function(req, res) {
	res.render('404');
});
app.use(function(error, req, res, next) {
	res.render('500', {
		error: error
	});
});
app.listen(3000);