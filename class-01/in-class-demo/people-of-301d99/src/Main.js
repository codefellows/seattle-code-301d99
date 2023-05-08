import React from 'react';
// I must import the components I want to use
import Person from './Person';


// Props is an object that gets passed to each component
// ex. let props = {name: ___}
class Main extends React.Component {

  // the name attribute will be added to props and passed down to that instance of Person.
  // similar to how in 201 we created instances of a constructor
  render() {
    return (
      <main>
      <Person name='Sheyna' hometown='Seattle' hairColor='Brown'/>
      <Person name='Ashley'/>
      <Person name='Dan'/>
      <Person name='Arthur'/>
      <Person name='Andrew'/>
      <Person name='Tiffani'/>
      <Person name='Jared'/>
      <Person name='Anthony'/>
      </main>
    );
  }
}

//I must export Main to be able to use it in another file (in this case App.js)
export default Main;
