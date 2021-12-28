const express = require('express');

const app = express();


app.use('/api/posts', (req, res, next) => {
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
