const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.send('our app v1');
})

app.listen(8000, () => {
	console.log('App Running');
});