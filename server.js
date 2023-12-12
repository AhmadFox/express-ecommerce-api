const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({path:'config.env'});

const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');
const errorModule = require('./utils/errorModule');
const globaleError = require('./middlewares/errorMiddleware');

// Connect with DB:
dbConnection();

// Express App:
const app = express();

// Middlewares:
app.use(express.json());

if ( process.env.NODE_ENV === 'development' ) {
	app.use(morgan('dev'));
	console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes:
app.use('/api/v1/categories', categoryRoute);

app.all("*", (req, res, next) => {
	// Create Error And Send It To Error handling Middleware
	next(new errorModule(`Cant't find this route ${req.originalUrl}`, 401));
});

// Gloable Error Handling Middelware for Express:
app.use(globaleError);

const PORT = process.PORT || 8000;
const server = app.listen(PORT, () => {
	console.log(`App Running on port ${PORT}`);
});

// Handling Rejections Outside Of Express:
process.on('unhandledRejection', (err) => {
	console.log(`unhandledRejection Error: ${err.name} | ${err.message}`);
	server.close(() => {
		console.log(`Shutting down....`);
		process.exit(1);
	})
});