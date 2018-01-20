const express = require('express');
const router = express.Router();

// modules this api provides routing for
const timestamp = require('../timestamp');

// Routes
router.route('/:query').get(timestamp.parse);

// If it's not an api request, display the index page (found in frontend)
router.get('*', (req, res) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render('index.pug', {
    fullUrl: fullUrl,
    title: 'Timestamp Microservice'
  });
});

module.exports = router;
