// you don't need 'use strict';

// The 3 things you need in every class component you create

// 1. import React
import React from 'react';
// import component files that I want to use in App
import Main from './Main.js';
// import the CSS
import './App.css';

// 2. declare the class
class App extends React.Component {

  // We need to call a render function that will return our JSX 
  // (JSX is the stuff that looks like HTML)
  render() {
    // is called a "Frag" or fractional element
    //  the <> allows use to use multiple tags as siblings
    // it will not render on our page
    return (
      <>
        <header>
          <h1>Welcome to 301!</h1>
        </header>
       <Main/>
        <footer>
          &copy; 2023; Code Fellows
        </footer>
      </>
    );
    
  }
};

// 3. export the class
export default App;
