const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const Post = require('./models/post'); 

const app = express();

mongoose.connect("mongodb+srv://pheric:tester12!@cluster0.prsr6.mongodb.net/BeerCards?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to the databse')
})
.catch(()  => {
  console.log('Connetion failed')
});

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
  const post = new Post({
    title: req.body.title,
    type: req.body.type,
    abv: req.body.abv,
    rating: req.body.rating,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  }); 
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Posts fetched!',
      posts: documents
    });
  });
  
});


app.delete('/api/posts/:id', (req, res, next) => {
  
  Post.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({message: 'Post removed'});
  });
  
});




module.exports = app;
