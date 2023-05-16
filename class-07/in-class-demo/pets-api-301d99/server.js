'use strict';

console.log('Our first server');

// THINGS (PACKAGES) I NEED TO INSTALL VIA THE TERMINAL
// - Express
// npm i express
// - dotenv
// npm i dotenv
// - nodemon — I only need to do this once for ALL TIME
// npm i -g nodemon
// - cors
// npm i cors


// REQUIRE
// In our server we have to use "require" instead of import

// to create a server we are bringing in express
const express = require('express');

// we need this to bring in variables from our .env file:
require('dotenv').config();

// bring in the JSON data:
let data = require('./pets.json');

// we need CORS to share data with the front end
const cors = require('cors');


// USE
// once we require something we need to use it.
// this is 2 steps for express (react did it in one with import)
const app = express();

// use cors as middleware
app.use(cors());

// PORT
// define our port
// this will confirm that our .env file is correctly wired up
const PORT = process.env.PORT || 3002;
// if there is a problem with my .env or how I'm importing it. the server will run on 3002. This could be a sign of a problem!!!!

// if you can't run on port because something is already there run this:
// npx kill-port 3001
// DO NOT do this on any port we haven't already used.


// ROUTES
// we will use to access our endpoints

// create a basic default route
// http://localhost:3001/
// app.get correlates for axios.get
// app.get takes in 2 arguements
// 1 - the url as a string ( '/' would be the root )
// 2 - a callback function
app.get('/', (request, response) => {
  response.send('hello, from our server');
});

app.get('/sayHello', (request, response) => {
  console.log(request.query.firstName);
  // the incoming request URL looks like this:
  // http://localhost:3001/sayHello?firstName=Sheyna&lastName=Watkins
  // I access the query parameters on request.query
  let firstName = request.query.firstName;
  let lastName = request.query.lastName
  response.send(`hi ${firstName} ${lastName}`);
});

app.get('/pet', (request, response) => {
  try {
    // http://localhost:3001/pets?species=dog
    let userSearchingForSpecies = request.query.species;
    let dataFromJSON = data.find(pet => pet.species === userSearchingForSpecies)
    let dataToSend = new Pet(dataFromJSON);
    response.send(dataToSend);
  } catch(error) {
    next(error);
  }
});


// * — catch all (wildcard)
// if the user comes to a route we haven't defined
// Put this at the bottom of all your routes
app.get('*', (request, response) => {
  response.send('The thing you are looking for doesn\'t exist');
});

// CLASSES

class Pet {
  constructor(petObject) {
    this.name = petObject.name;
    this.breed = petObject.breed;
  }
}

// ERRORS
// Handle any errors
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


// LISTEN
// start our server
app.listen(PORT, () => console.log(`listening on ${PORT}`));
