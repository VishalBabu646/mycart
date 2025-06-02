const express = require('express');
const app = express();
const errorMiddleware = require('../backend/middlewares/error')

app.use(express.json());
const products = require('./routes/products');

app.use('/api/v1',products);


app.use(errorMiddleware);



module.exports = app;