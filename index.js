require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const envVars = process.env;
const PORT = envVars.PORT || 8080;
const dbURI = `mongodb://${envVars.DB_USER}:${envVars.DB_PASS}@${envVars.DB_HOST}`;

app.use(cors());
app.use(express.json());
app.use('/api', require('./routes'));

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, './client/build')));

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

mongoose.connect(dbURI).then((result) => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
        console.log(`App listening on http://localhost:${PORT}`)
    });
}).catch(err => console.log(err));