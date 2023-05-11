import React from 'react';
// listGroup component is Bootstrap's version of UL
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

let data = [1,2,3,4,5,6,7,8,9,10];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      howToFilter: '',
      rawData: data,
      filteredData: data
    }
  }

    handleSubmit = (event) => {
      event.preventDefault();
      // console.log(event.target.namefirst.value);
      let fullName = `${event.target.namefirst.value} ${event.target.namelast.value}`;
      // console.log(fullName);
      console.log(this.state);
      this.setState({
        fullName: fullName,
        // howToFilter: event.target.selected.value
      });
      //setState is slow, you can't put something into state and immediately use it
      console.log(this.state.howToFilter); // Odd, Even, ALL
      if (this.state.howToFilter === 'even') {
        let newData = this.state.rawData.filter((num) => num % 2 === 0);
        console.log(newData);
        this.setState({filteredData: newData});

      } else if (this.state.howToFilter === 'odd') {
        let newData = this.state.rawData.filter((num) => num % 2 === 1);
        this.setState({filteredData: newData});
      } else {
        // "all"
        this.setState({filteredData: this.state.rawData});
      }


      // access a value from a From.Group controlId
      console.log(event.target.username.value);
    }

    handleSelectChange = (event) => {
      let selected = event.target.value;
      this.setState({
        howToFilter: selected
      });
    }

    render() {

      let numbers = this.state.filteredData.map((num, idx) => {
        // ListGroup.Item is our LI
        return <ListGroup.Item key={idx}>{num}</ListGroup.Item>
      })
      // console.log(this.state);
      return (
        
        <>
        <header>
          <h1>Forms in React</h1>
          </header>
          <main className="main">
            <Form onSubmit={this.handleSubmit}>
              {/* "for" means a for loop in JS; so we have to use htmlFor to link a label and input for HTML screen readers */}
              <Form.Label htmlFor="firstname">Your First Name</Form.Label>
              <Form.Control id="firstname" type="text" name="namefirst"/>

              <Form.Label>Your Last Name
                <Form.Control type="text" name="namelast"/>
              </Form.Label>

              {/* controlId is how we access the values via our event handlers */}
              {/* does not need and htmlFor, an id or name */}
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text"/>
              </Form.Group>

              <Form.Label>Select Numbers
                <Form.Select name="selected" onChange={this.handleSelectChange}>
                  <option value="all">All</option>
                  <option value="odd">Odd</option>
                  <option value="even">Even</option>
                </Form.Select>
              </Form.Label>
              {/*  use type="submit" on the submit button in Bootstrap */}
              <Button type="submit">Submit</Button>
            </Form>

            {/* ListGroup is our UL */}
            <ListGroup>
              {numbers}
            </ListGroup>
          </main>
        </>
      )
    }
}

export default App;


/* "for" means a for loop in JS; so we have to use htmlFor to link a label and input for HTML screen readers */
/*

            <form onSubmit={this.handleSubmit}>
              
              <label htmlFor="firstname">Your First Name</label>
              <input id="firstname" type="text" name="namefirst"/>

              <label>Your Last Name
                <input type="text" name="namelast"/>
              </label>

              <label>Select Numbers
                <select name="selected" onChange={this.handleSelectChange}>
                  <option value="all">All</option>
                  <option value="odd">Odd</option>
                  <option value="even">Even</option>
                </select>
              </label>
              <button type="submit">Submit</button>
            </form>

*/
