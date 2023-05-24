import React from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';
import UpdateCatForm from './UpdateCatForm';

class Cats extends React.Component {
  render() {
    let cats = this.props.cats.map((cat) => (
      <Cat 
        key={cat._id} 
        cat={cat}
        deleteCats={this.props.deleteCats}
        putCats={this.props.putCats}
      />
    ))
    return (
      <>
        {
          this.props.cats.length > 0 &&
          <Container>
            <ListGroup>
              {cats}
            </ListGroup>
          </Container>
        }
      </>
    )
  }
}

export default Cats;


class Cat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateForm: false
    }
  }

  // delete = () => this.props.deleteCats(this.props.cat._id);

  render() {
    return (
      <>
        <ListGroup.Item>
          {this.props.cat.name} is {this.props.cat.color}
          <div>
            <Button 
              variant='dark'
              onClick={() => this.props.deleteCats(this.props.cat._id)}
            >
              Delete Cat
            </Button>
            <Button 
              onClick={() => this.setState({showUpdateForm: true})}
            >
              Update Cat
            </Button>
          </div>
        </ListGroup.Item>
        {
          this.state.showUpdateForm &&
          <UpdateCatForm 
            cat={this.props.cat}
            putCats={this.props.putCats}
          />
        }
      </>
    )
  }
}
