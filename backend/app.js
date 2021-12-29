const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post); 
  res.status(201).json({
    message: 'Post added successfully'
  }); 

});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    { 
      id: '1', 
      title: 'Sierra Nevada Hazy Little Thing', 
      type: 'Hazy IPA', 
      abv: 6.8, 
      rating: 7, 
      content: 'Liked it a lot.'  
    },
    { 
      id: '2', 
      title: 'Bud Light', 
      type: 'Lager', 
      abv: 4.6, 
      rating: 4, 
      content: 'no good.'  
    }
  ];



  res.status(200).json({
    message: 'Posts fetched!',
    posts: posts
  });
});

module.exports = app;
