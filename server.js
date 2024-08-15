const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./db')

const app = express();
app.use(bodyParser.json());



const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
