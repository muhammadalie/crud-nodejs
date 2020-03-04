var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Configuring Passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Configuring the database
const dbConfig = require('./config/database');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var usersRouter = require('./routes/users');
var noteRouter = require('./routes/note');
var fileRouter = require('./routes/file');

var app = express();
const port = 8122;

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

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

app.use(
	require('express-session')({
		secret: 'keyboard cat',
		resave: true,
		saveUninitialized: true
	})
);
app.use(passport.initialize());
app.use(passport.session());

var User = require('./models/user').Auth;
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	next();
});

app.use('/user', usersRouter);
app.use('/note', noteRouter);
app.use('/file', fileRouter);

app.use(function(req, res, next) {
	next(createError(404));
});

app.use(function(err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error');
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
module.exports = app;
