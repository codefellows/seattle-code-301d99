import React from 'react';
// I must import the components I want to use
import Person from './Person';



// Props is an object that gets passed to each component
// ex. let props = {name: ___}
class Main extends React.Component {

  // the name attribute will be added to props and passed down to that instance of Person.
  // similar to how in 201 we created instances of a constructor
  render() {

    // iterate over the data array and create a Person component for each item in the array
    // each item in my data array I'm calling pep as I iterate over the data
    let people = this.props.data.map((pep, idx) => {
      // create an instance of my Person component out of each pep 
      // console.log(pep);
        return(<Person
          name={pep.name}
          imageURL={pep.imageURL}
          key={idx}
          addHearts={this.props.addHearts}
          handleShowModal={this.props.handleShowModal}
        />)
    });


    return (
      <main>
        {people}
      </main>
    );
  }
}

//I must export Main to be able to use it in another file (in this case App.js)
export default Main;
