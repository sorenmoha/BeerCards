const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, required: true }, 
    type: { type: String, required: true }, 
    abv: { type: Number, required: true },   // can set default value to autofill ABV once data is established. 
    rating: { type: Number, required: true },  
    content: { type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema); 


