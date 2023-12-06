const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({path:'config.env'});

const app = express();


const mood = process.env.NODE_ENV;
if ( mood === 'development' ) {
	app.use(morgan('dev'));
	console.log(`mode: ${mood}`);
}

app.get('/', (req, res) => {
	res.send('our app v3');
})

const port = process.PORT || 8000;
app.listen(port, () => {
	console.log(`App Running on port ${port}`);
});