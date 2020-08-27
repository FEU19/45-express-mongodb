const express = require('express')
const app = express()
const port = 1337;

const { getAllHats } = require('./database.js');

// Tema: hattaffär

// Middleware

// Routes
// GET /api/hats
app.get('/api/hats', (req, res) => {
	console.log('GET /api/hats');
	let data = getAllHats();
	res.send(data)
})

// GET /api/hat?id=x
// POST
// PUT
// DELETE

// (eventuellt felhantering)


// Starta webbservern
app.listen(port, () => console.log('Server is listening on port ' + port))
