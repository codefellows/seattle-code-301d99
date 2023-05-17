'use strict';

// REQUIRE
// required from npm
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// instantiate express server by calling express
const app = express();

// USE
app.use(cors());

// define port and proof that env works
const PORT = process.env.PORT || 3002;

// ROUTES
app.get('/', (req, res) => {
  res.status(200).send('Hello there!')
});

// http://localhost:3001/photos?searchQuery=kitten
app.get('/photos', async (req, res) => {
  // probably need a try catch
  // the thing that the user is searching for:
  console.log(req.query.searchQuery);
  let searchQuery = req.query.searchQuery;
  // need the request URL from the API (in this case Unsplash API)
  // searchQuery -   if the user is seraching for kittens, pass that value into the URL I'm sending the API

  let url = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_API_KEY}&query=${searchQuery}&orientation=landscape`;
  let photoData = await axios.get(url);

  // console.log(photoData.data.results);
  let picArray = photoData.data.results.map(pic => new Photo(pic));

  res.status(200).send(picArray);

});


// star route - catch all
app.get('*', (req, res) => {
  res.status(404).send('These are not the droids you are looking for...')
});


// CLASSES
class Photo {
  constructor(pic) {
    this.src = pic.urls.regular;
    this.alt = pic.alt_description;
    this.artist = pic.user.name
  }
}


// ERRORS
app.use((error, request, response, next) => {
  console.log(error.message)
  response.status(500).send(error.message)
});

// LISTEN
// need to listen to keep server running
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
