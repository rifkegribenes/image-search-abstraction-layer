// server.js

/* ================== SETUP ================== */

require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');

const search = require('./search');
const searchTerm = require('./models/searchTerm');

app.use(bodyParser.json());
app.use(cors());

app.use(express.static('public'));


/* ================== DB CONNECTION ================== */

const MONGODB_URI = null;
// `mongodb://${process.env.USER}:${process.env.PASS}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB}` || null;

// connect to DB
mongoose.connect('mongodb://localhost/searchTerms');

mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* ================== ROUTES ================== */

// get all recent search terms
app.get('/api/recent', (req, res, next) => {
	searchTerm.find({}, (err, data) => {
		if (err) {
			data.error = 'Could not find recent search terms';
		}
		res.json(data);
	});
});

// new image search
app.get('/api/search/:searchVal*', (req, res, next) => {
	const { searchVal } = req.params;
	const { offset } = req.query;

	const data = new searchTerm({
		searchVal,
		searchDate: new Date()
	});

	data.save(err => {
		if (err) {
			console.log(`Error Saving to database: ${err}`);
		}
	});

	search(searchVal, offset, (data) => {
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
    const error = data.error;
	  res.render('index.pug', {
	    fullUrl,
	    baseUrl,
	    data,
	    error
	  });
  });
});

// static route (index)
app.set('view engine', 'pug');

app.get('*', (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  res.render('index.pug', {
    fullUrl: fullUrl
  });
});

const server = http.createServer(app);
const port = process.env.PORT || 8080;
app.set('port', port);
server.listen(port, () => console.log(`Server listening on localhost:${port}`));
