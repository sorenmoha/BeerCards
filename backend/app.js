const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');

const app = express();

mongoose.connect(
  "mongodb+srv://pheric:<password>@cluster0.prsr6.mongodb.net/BeerCards?retryWrites=true&w=majority"
)
.then(() => {
  console.log('Connected to the databse')
})
.catch(() => {
  console.log('Connetion failed')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use ('/api/posts', postsRoutes)


module.exports = app;
