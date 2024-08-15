const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL, {
});

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('MongoDB connected')
})
db.on('disconnected',()=>{
    console.log('MongoDB disconnected')
})

db.on("error", console.error.bind(console, "connection error:"));

module.exports = db;

