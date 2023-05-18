'use strict';
const axios = require('axios');

let getPhotos = async (req, res, next) => {

  // the thing that the user is searching for:
  let searchQuery = req.query.searchQuery;
  // need the request URL from the API (in this case Unsplash API)
  // searchQuery -   if the user is seraching for kittens, pass that value into the URL I'm sending the API
  let params = {
    client_id: process.env.UNSPLASH_API_KEY,
    query: searchQuery,
    orientation: landscape
  }

  let url = 'https://api.unsplash.com/search/photos';

  axios.get(url, { parama })
    .then(photoData => photoData.data.results.map(pic => new Photo(pic)))
    .then(picArray => res.status(200).send(picArray))
    .catch(error => console.error(err));

// let photoData = await axios.get(url, { params });

  // // console.log(photoData.data.results);
  // let picArray = photoData.data.results.map(pic => new Photo(pic));

  // res.status(200).send(picArray);
  // } catch(error) {
  //   Promise.resolve().then(() => {
  //     throw new Error(error.message);
  //   }).catch(next)
  // }

}


// CLASSES
class Photo {
  constructor(pic) {
    this.src = pic.urls.regular;
    this.alt = pic.alt_description;
    this.artist = pic.user.name
  }
}

module.exports = getPhotos;


/*

let getPhotos = async (req, res, next) => {
  try {
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
  } catch(error) {
    next(error)
  }

}

*/


/*

let getPhotos = async (req, res, next) => {
  try {
  // the thing that the user is searching for:
  console.log(req.query.searchQuery);
  let searchQuery = req.query.searchQuery;
  // need the request URL from the API (in this case Unsplash API)
  // searchQuery -   if the user is seraching for kittens, pass that value into the URL I'm sending the API
  let params = {
    client_id: process.env.UNSPLASH_API_KEY,
    query: searchQuery,
    orientation: landscape
  }

  let url = 'https://api.unsplash.com/search/photos';
  let photoData = await axios.get(url, { params });

  // console.log(photoData.data.results);
  let picArray = photoData.data.results.map(pic => new Photo(pic));

  res.status(200).send(picArray);
  } catch(error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next)
  }

}

*/
