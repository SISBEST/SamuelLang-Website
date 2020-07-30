var express = require('express');
var fs = require('fs');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('static'));
app.use('/x', express.static('packages'));
app.use(bodyParser.text());

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
	fs.readFile('packages/' + req.params.name + '/info.txt', 'utf8', function(err, data) {
		res.render('packages/info', {
			name: req.params.name,
			desc: data || "Package does not exist."
		});
	});
});

app.post('/packages/:name', (req, res) => {
	if (!fs.existsSync('packages/' + req.params.name + '/info.txt')) {
		fs.writeFile('packages/' + req.params.name + '/main.samuel', req.body,'utf8', function(err) {
			res.send(req.body);
		});	
	} else {
		res.status(403).send("Package already exists.")
	}
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