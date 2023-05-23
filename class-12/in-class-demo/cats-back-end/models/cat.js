'use strict';

/*
  each cat in our database should look something like this:

  let aCat = {
    name: 'Mr. Mistoffelees',
    color: 'black and white',
    spayNeuter: true,
    location: 'London'
  }
*/

// bring in mongoose here (as well as the server.js)
const mongoose = require('mongoose');

// extract the schema
const { Schema } = mongoose;

// create a cat schema, define how our object should be structured
const catSchema = new Schema({
  name: {type: String, required: true},
  color: {type: String, required: true},
  spayNeuter: {type: Boolean, required: true},
  location: {type: String, required: true},
});

// create a Model and tell the model about the rules (AKA the schema)
// we pass mongoose.model a string name for the collection and an instance of schema
const CatModel = mongoose.model('Cat', catSchema);


module.exports = CatModel;
