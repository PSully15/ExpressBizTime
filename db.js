const { Client } = require('pg');

let DB_URI;

// If we're running in test "mode", use our test db
if (process.env.NODE_ENV === 'test') {
	DB_URI = 'postgresql:///biztime_test';
} else {
	DB_URI = 'postgresql:///biztime';
}

// create the client to connect to the db
let db = new Client({
	connectionString: DB_URI,
});

db.connect();

module.exports = db;
