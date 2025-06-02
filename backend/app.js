const express = require('express');
const app = express();
const errorMiddleware = require('../backend/middlewares/error')
const auth = require('./routes/auth');

app.use(express.json());
const products = require('./routes/products');

app.use('/api/v1',products);
app.use('/api/v1/',auth)


app.use(errorMiddleware);



module.exports = app;