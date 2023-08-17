import React from 'react';
import Header from './components/Header';
import Recipes from './components/Recipes';
import Footer from './components/Footer';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      ingredient:'',
      recipes: []
    }
  }


  render() {
    return(
      <>
        <Header />
        <Recipes />
        <Footer />
      </>
    )
  }
}

export default App;
