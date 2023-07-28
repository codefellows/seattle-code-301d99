'use strict';
const axios = require('axios');
const Recipe = require('./recipe-class');

const inMemoryDB = {};

module.exports = function (request, response) {
  const ingredient = request.query.ingredient;

  if(inMemoryDB[ingredient] !== undefined){
    console.log('getting info from db', ingredient)
    console.log('db', inMemoryDB)
    return inMemoryDB[ingredient];
  } else {
    console.log('getting info from super', ingredient)
    const url = `https://api.edamam.com/search/?q=${ingredient}&app_id=${process.env.FOOD_APP_ID}&app_key=${process.env.FOOD_APP_KEY}`;
  
    axios
      .get(url)
      .then(res => {
        const recipeArr = res.data.hits.map(recipe => new Recipe(recipe.recipe));
        inMemoryDB[ingredient] = recipeArr;
        console.log('putting info in db', inMemoryDB)
        response.status(200).send(recipeArr);
      })
      .catch(err => {
        console.error('error', err);
        response.status(500).send('error', err);
      })
  }
}
