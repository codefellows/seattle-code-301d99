'use strict'

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// bring in mongoose
const mongoose = require('mongoose');

// need to bring in a scheme if we want to interact with that collection
const Cat = require('./models/cat');

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// connect Mongoose to our MongoDB on Atlas
mongoose.connect(process.env.DB_URL);

// USE
// implement express
const app = express();

// middleware
app.use(cors());
// MUST haved this to recieve json from a request
app.use(express.json());

// define PORT validate env is working
const PORT = process.env.PORT || 3002;

// ROUTES
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

app.get('/cats', getCats);
app.post('/cats', postCats);

// We are sending the id of the cat we want to delete as a path parameter.
// ex:
// http://localhost:3001/cats/646d00919bff84170594042b
// ":" — declars a variable (sort of like "let id = ..."")
// "id" — variable of my choosing, can be called anything. I'm calling mine "id"
app.delete('/cats/:id', deleteCats)

async function getCats(req, res, next) {
  // http://localhost:3001/cats
  try {
    let results = await Cat.find();
    res.status(200).send(results);
  } catch(err) {
    next(err)
  }
}

async function postCats(req, res, next) {
  // add a whole new cat object to the database
  console.log(req.body);
  try {
    // we want to write code here to add a cat to the database
    let createdCat = await Cat.create(req.body);
    res.status(200).send(createdCat);
  } catch(err) {
    next(err);
  }
}

async function deleteCats(req, res, next) {
  try {
    // // http://localhost:3001/cats/646d00919bff84170594042b
    // to extract the value where the ID is (in this case: 646d00919bff84170594042b )
    console.log(req.params.id);
    let id = req.params.id;

    // delete the cat from our database
    await Cat.findByIdAndDelete(id);
    // don't bother sending the deleted cat back in the response, it won't always be there
    res.send('Cat deleted');
    
  } catch(err) {
    next(err);
  }
}


app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  res.status(500).send(error.message);
});

// LISTEN
app.listen(PORT, () => console.log(`listening on Port ${PORT}`));
