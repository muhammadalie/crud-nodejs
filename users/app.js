const express = require('express');
const bodyParser = require('body-parser');

// Configuring the database
const dbConfig = require('./config/database');
const mongoose = require('mongoose');

// Require routes
ProfileRoutes = require('./routes/profile');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
	.connect(dbConfig.url, {
		useNewUrlParser: true
	})
	.then(() => {
		console.log('Successfully connected to the database');
	})
	.catch(err => {
		console.log('Could not connect to the database. Exiting now...', err);
		process.exit();
	});

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// define a simple route
app.use('/profile', ProfileRoutes);

// listen for requests
app.listen(8123, () => {
	console.log('Server is listening on port 8123');
});
