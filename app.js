const express = require('express');
const ExpressError = require('./expressError');
const morgan = require('morgan');

const app = express();

// parse request bodies for JSON
app.use(express.json());
app.use(morgan('dev'));

// 404 handler
app.use((req, res, next) => {
	const e = new ExpressError('Page Not Found', 404);
	// pass the error to the next piece of middleware
	return next(e);
});

// general error handler
app.use((err, req, res, next) => {
	// the default status is 500 Internal Server Error
	let status = err.status || 500;
	let message = err.msg;

	// set the status and alert the user
	return res.status(status).json({
		error: {
			message: message,
			status: status,
		},
	});
});

module.exports = app;
