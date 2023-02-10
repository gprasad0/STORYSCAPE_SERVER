require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const routes = require('./app/routes/routes');
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

app.use('/api', routes)


mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


app.use(express.json());

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})