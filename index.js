require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const CLIENT_ID = process.env.CLIENT_ID;
const PORT = process.env.PORT || 8080;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, './client/build')));

app.get('/login', (req, res) => {
    res.send(`hello`);
});


// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
});