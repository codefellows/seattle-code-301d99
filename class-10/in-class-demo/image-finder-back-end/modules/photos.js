'use strict';
const axios = require('axios');

// every time a request comes to the server, we are going to save the data that came back from the API (and we turned into instances of Photo)
// save the array of instance of photo (the data we send to the front end) in this cache
// if the user searches for kitten our key in this object will be kitten
let cache = {
  // ex.:
  // kittenData: <the data I would send to the front end>
};

let getPhotos = async (req, res, next) => {
  try {
    // the thing that the user is searching for:
    console.log(req.query.searchQuery);
    let searchQuery = req.query.searchQuery;

    // create the key to put in our cache, so we can find the data later
    let key = searchQuery + 'Data'; // instead of 'kitten' it would be 'kittenData'


    // if the user is requesting something already in the cache, then send the user the cached data
    // all this Date math determines how long the data has been cached if data has been cached
    // timeToCache is the max allowed time to reuse cached data
    let timeToCache = 1000 * 60 * 60 * 24 * 30; // 30 days
     // Make milliseconds human readable:
    // - 1000 milliseconds in a second
    // - 60 seconds in minute
    // - 60 minutes in an hour
    // - 24 hours in a day 
    // - 30-ish days in a month || 7 days in a week
    // - 12 months in a year ...
    // let timeToTestCache = 1000 * 20; // 20 seconds
    if (cache[key] && Date.now() - cache[key].timeStamp < timeToCache) {
      console.log('it is in the cache');
      res.status(200).send(cache[key].data);
    } else {
      // if the data is in not in the cache make a new request
      console.log('it is not in the cache. make a new request');

      // need the request URL from the API (in this case ,Unsplash API)
      // searchQuery -   if the user is seraching for kittens, pass that value into the URL I'm sending the API
      let url = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_API_KEY}&query=${searchQuery}&orientation=landscape`;
      let photoData = await axios.get(url);

      // console.log(photoData.data.results);
      let picArray = photoData.data.results.map(pic => new Photo(pic));

      // save the groomed data in the cache:
      // ex.:
      // cache.kittenData
      cache[key] = {
        data: picArray, // the groom data that goes to the front end
        timeStamp: Date.now()
      }
      res.status(200).send(picArray);
    }
  } catch(error) {
    next(error)
  }

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


/*

let getPhotos = async (req, res, next) => {

  // the thing that the user is searching for:
  let searchQuery = req.query.searchQuery;
  // need the request URL from the API (in this case Unsplash API)
  // searchQuery -   if the user is seraching for kittens, pass that value into the URL I'm sending the API
  let params = {
    client_id: process.env.UNSPLASH_API_KEY,
    query: searchQuery,
    orientation: "landscape"
  }

  let url = 'https://api.unsplash.com/search/photos';

  axios.get(url, { params })
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
*/
