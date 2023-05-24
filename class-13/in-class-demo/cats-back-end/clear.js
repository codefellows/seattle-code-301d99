'use strict';

// the opposite of our seed.js
// runing this with 
// node clear.js
// will delete every Cat in our database

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const Cat = require('./model/cat');

async function clear() {
  try {
    await Cat.deleteMany({});
    console.log('cats cleared from DB');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

clear();
