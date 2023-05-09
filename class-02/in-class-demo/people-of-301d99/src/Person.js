import React from 'react';
import Button from 'react-bootstrap/Button';
import './Person.css';

// let numberOfGreetings = 0;

class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greetings: 0
    }
  }

  handleGreetings = () => {
    // increase the number of greetings in the value in state
    this.setState({
      greetings: this.state.greetings + 1
    });
    // setState basically cases render to be invoked again

    // numberOfGreetings++
    // console.log(numberOfGreetings);
  }

  render() {
    // // all date from parent comes attached to the props object
    // console.log(this.props);
    // // to access properties on props I drill down like so:
    // console.log(this.props.name);

    // in my JSX (the stuff that looks like HTML), I can write JavaScript inside {}
    // in this case i'm just passing a JavaScript variable that contains the name value: this.props.name
    return (
      <article className="person">
        <h3>{this.props.name}</h3>
        <p>👋 {this.state.greetings} greetings</p>

        {/* In React we can put our event listners inline like this. */}
        {/* onClick listens for a click event and when there is a click it invokes this.handleGreetings */}
        <p onClick={this.handleGreetings}>Say Hello</p>
        <img
          src={this.props.imageURL}
          alt={this.props.name}
          title={this.props.name}
        />
        <Button>BootStrap Button</Button>
        <button>Regular HTML button</button>
      </article>
    )
  }
}

export default Person;
