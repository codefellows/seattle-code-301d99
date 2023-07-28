'use strict';

module.exports = class {
  constructor(recipe) {
    this.uri = recipe.uri;
    this.name = recipe.label;
    this.image_url = recipe.image;
    this.ingredients = recipe.ingredientLines;
    this.totalTime = recipe.totalTime;
  }
}