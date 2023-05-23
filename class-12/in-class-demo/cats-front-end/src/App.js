import React from 'react';
import axios from 'axios';
import './App.css';
import Cats from './Cats';
import { Button, Container, Form } from 'react-bootstrap';

let SERVER = process.env.REACT_APP_SERVER;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cats: []
    }
  }

  getCats = async () => {
    try {
      let results = await axios.get(`${SERVER}/cats`);
      this.setState({
        cats: results.data
      });
    } catch(error){
      console.log('we have an error: ', error.response.data)
    }
  }

  postCats = async (newCat) => {
    try {
      let url = `${SERVER}/cats`;
      // add the new cat to the database
      // axios.post() takes in two arguments:
      // 1 - the URL (the endpoint on our server)
      // 2 — the cat object we want added
      let createdCat = await axios.post(url, newCat);
      console.log(createdCat.data);
      // this.getCats();
      this.setState({
        cats: [...this.state.cats, createdCat.data]
      });
    } catch(error){
      console.log('we have an error: ', error.response.data)
    }
  }

  deleteCats = async (id) => {
    try {
      let url = `${SERVER}/cats/${id}`;
      // in the real world, maybe validate that that the user allowed to delete the thing

      // make a request to delete a cat.
      // DO NOT expect a returned value from axios.delete();
      await axios.delete(url);
      // this.getCats();
      // for filter:
      // everything on the right side of the => is the condition
      // if the condition is true, the item we are examining goes onto the new array
      let updatedCats = this.state.cats.filter(cat => cat._id !== id);
      this.setState({
        cats: updatedCats
      });
    } catch(error){
      console.log('we have an error: ', error.response.data)
    }
  }

  handleCatSubmit = (e) => {
    e.preventDefault();
    // extract the values from the form and make a new object
    let newCat = {
      name: e.target.name.value,
      location: e.target.location.value,
      color: e.target.color.value,
      spayNeuter: e.target.spayNeuter.checked
    };
    this.postCats(newCat);
  }

  // the next effect of this is when the site loads (specifically this component — it has all it needs), the data will be there
  componentDidMount() {
    this.getCats();
  }

  render() {
    console.log(this.state.cats);

    return (
      <>
        <header>
          <h1>Cool Cats</h1>
        </header>
        <main>
          <Cats
            cats={this.state.cats}
            deleteCats={this.deleteCats}
          />
          <Container className="mt-5">
            <Form onSubmit={this.handleCatSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="color">
                <Form.Label>Color</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="spayNeuter">
                <Form.Check type="checkbox" label="spay-neuter" />
              </Form.Group>
              <Button type="submit">Add Cat</Button>
            </Form>
          </Container>
        </main>
      </>
    );
  }
}

export default App;
