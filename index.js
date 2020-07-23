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