import React from 'react';
import IngredientForm from './IngredientForm';
import Recipe from './Recipe';

class Recipes extends React.Component {
  constructor(props){
    super(props);
    this.state={
      recipes: []
    }
  }

  updateRecipes = (recipes) => this.setState({ recipes });

  render() {
    return (
      <>
        <IngredientForm updateRecipes={this.updateRecipes} />
        {this.state.recipes.length && this.state.recipes.map((recipe, idx) => (
          <div key={idx}>
            <Recipe recipe={recipe} />
          </div>
        ))}
      </>
    )
  }
}

export default Recipes;
