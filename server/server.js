const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 1337;

const { getAllHats, getHat, addHat } = require('./database.js');

// Tema: hattaffär

// Middleware
app.use( express.static(__dirname + '/../public') )
app.use( (req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	next()
} )
app.use( bodyParser.urlencoded({ extended: true }) )
app.use( bodyParser.json() )

// Routes
// GET /api/hats
app.get('/api/hats', (req, res) => {
	getAllHats(dataOrError => {
		res.send(dataOrError)
	});
})

// GET /api/hat?id=x
app.get('/api/hat', (req, res) => {
	getHat(req.query.id, dataOrError => {
		res.send(dataOrError)
	})
})

// POST
app.post('/api/hat?', (req, res) => {
	console.log('hello post', req.body);
	addHat(req.body, dataOrError => {
		res.send(dataOrError)
	})
})

// PUT
// DELETE

// (eventuellt felhantering)


// Starta webbservern
app.listen(port, () => console.log('Server is listening on port ' + port))
