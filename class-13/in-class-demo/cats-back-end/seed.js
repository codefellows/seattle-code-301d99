'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
// connect Mongoose to our MongoDB on Atlas
mongoose.connect(process.env.DB_URL);

// need to bring in a scheme if we want to interact with that collection
const Cat = require('./models/cat');

// this only needs to run once.
// we don't need to continually add the same cats to the database
async function seed() {
  // the structure of each cat I add has to be the same as my cat schema
  // name: {type: String, required: true},
  // color: {type: String, required: true},
  // spayNeuter: {type: Boolean, required: true},
  // location: {type: String, required: true},
  await Cat.create({
    name: 'Skimbleshanks',
    color: 'orange tabby',
    spayNeuter: true,
    location: 'railroad'
  });
  console.log('Skimble was added to the database');

  await Cat.create({
    name: 'Oswald',
    color: 'orange',
    spayNeuter: true,
    location: 'Georgia'
  });
  console.log('Oswald was added to the database');

  await Cat.create({
    name: 'Nemo',
    color: 'orange',
    spayNeuter: true,
    location: 'Seattle'
  });
  console.log('Nemo was added to the database');
  mongoose.disconnect();
}

seed();

// to evoke this file run this in the terminal: (node and thent he name of the file)
// ex.:
// node seed.js
