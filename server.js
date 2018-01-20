// server.js

// init project
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Bing = require('node-bing-api')({accKey: 'fb2f8724d1b54c23a86e066103ea0c6e'});


app.use(bodyParser.json());
app.use(cors());

// call API with required & optional params
app.get('/api/imagesearch/:searchVal*', (req, res, next) => {
	const { searchVal } = req.params;
	const { offset } = req.query;

	res.json({
		searchVal,
		offset
	});
});

// const MONGODB_URI=`mongodb://${process.env.USER}:${process.env.PASS}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB}`;

// // connect to DB
// mongoose.connect(MONGODB_URI);

// mongoose.Promise = global.Promise;

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// // create DB entry
// app.get('/new/:originalUrl(*)', (req, res, next) => {
// 	const { originalUrl } = req.params;

// 	// regex to test for valid url
// 	const regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

// 	if (regex.test(originalUrl) === true) {
// 		const shorterUrl = shortid.generate();
// 		const data = new shortUrl(
// 			{
// 				originalUrl,
// 				shorterUrl
// 			});
// 		data.save(err => {
// 			if (err) {
// 				console.log(`Error saving to database: ${err}`);
//         return;
// 			}
// 		});
// 		return res.json(data);
// 	} else {
// 		const data = new shortUrl({
// 			originalUrl,
// 			shorterUrl: 'Invalid URL'
// 		})
// 		return res.json(data);
// 	}
// });

// app.use(express.static('public'));

// // Query db and forward to original URL
// app.get('/:shorterUrl', (req, res, next) => {
// 	const { shorterUrl } = req.params;
// 	shortUrl.findOne({'shorterUrl': shorterUrl}, (err, data) => {
// 		if (err) {
// 			return res.send('Error reading database');
// 		}
// 		// check if we need to add http to the saved url
// 		const regex = new RegExp("^(http|https)://", "i");
// 		const { originalUrl } = data;
// 		if (regex.test(originalUrl)) {
// 			res.redirect(301, originalUrl);
// 		} else {
// 			res.redirect(301, `http://${originalUrl}`);
// 		}
// 	})
// });


// app.set('view engine', 'pug');

// app.get('*', (req, res) => {
//   const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
//   res.render('index.pug', {
//     fullUrl: fullUrl,
//     title: 'URL Shortener Microservice'
//   });
// });


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on localhost:${port}`));