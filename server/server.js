const express = require('express')
const app = express()
const port = 1337;

const { getAllHats, getHat } = require('./database.js');

// Tema: hattaffär

// Middleware
app.use( express.static(__dirname + '/../public') )

// Routes
// GET /api/hats
app.get('/api/hats', (req, res) => {
	console.log('GET /api/hats');
	getAllHats(dataOrError => {
		res.send(dataOrError)
	});
})

// GET /api/hat?id=x
app.get('/api/hat', (req, res) => {
	console.log('GET /api/hat');
	getHat(req.query.id, dataOrError => {
		res.send(dataOrError)
	})
})

// POST
// PUT
// DELETE

// (eventuellt felhantering)


// Starta webbservern
app.listen(port, () => console.log('Server is listening on port ' + port))
