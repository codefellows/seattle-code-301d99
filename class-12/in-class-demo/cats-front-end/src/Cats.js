import React from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';

class Cats extends React.Component {
  render() {
    let cats = this.props.cats.map((cat) => (
      <Cat 
        key={cat._id} 
        cat={cat}
        deleteCats={this.props.deleteCats}
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

  // delete = () => this.props.deleteCats(this.props.cat._id);

  render() {
    return (
      <ListGroup.Item>
        {this.props.cat.name} is {this.props.cat.color}
        <Button 
          variant='dark'
          onClick={() => this.props.deleteCats(this.props.cat._id)}
        >
          Delete Cat
        </Button>
      </ListGroup.Item>
    )
  }
}
