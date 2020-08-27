const express = require('express')
const app = express()
const port = 1337;

// Tema: hattaffär

// Middleware

// Routes
// GET /api/hats
app.get('/api/hats', (req, res) => {
	console.log('GET /api/hats');
	res.send('GET /api/hats')
})

// GET /api/hat?id=x
// POST
// PUT
// DELETE

// (eventuellt felhantering)


// Starta webbservern
app.listen(port, () => console.log('Server is listening on port ' + port))
