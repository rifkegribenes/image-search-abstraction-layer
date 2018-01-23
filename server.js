// server.js

/* ================== SETUP ================== */

require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const path   = require('path');

const search = require('./search');
const searchTerm = require('./models/searchTerm');

app.use(bodyParser.json());
app.use(cors());
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });


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

	// searchTerm.distinct('searchVal', (err, data) => {
	//   if (err) return handleError(err);
	//   console.log(data);
	//   res.json(data);
	// });

	searchTerm.aggregate(
    [
        // { "$match": {
        //     "searchVal": { $regex: new RegExp( 't' ,'i') }
        // }},
        // Grouping pipeline
        { "$group": {
				    _id: "$searchVal",
				    doc: {$first: "$$ROOT"}
				}},
        // Sorting pipeline
        { "$sort": { "searchDate": -1 } },
        // Optionally limit results
        // { "$limit": 10 }
    ],
    (err, data) => {
      if (err) return handleError(err);
		  console.log(data);
		  res.json(data);
    }
	);


	// searchTerm.find({}, (err, data) => {
	// 	if (err) {
	// 		data.error = 'Could not find recent search terms';
	// 	}
	// 	res.json(data);
	// });
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
    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
    data.baseUrl = baseUrl;
    res.json(data);
  });
});


// set static path
app.use(express.static(path.join(__dirname, '/client/build/')));

const server = http.createServer(app);
const port = process.env.PORT || 8080;
app.set('port', port);
server.listen(port, () => console.log(`Server listening on localhost:${port}`));
