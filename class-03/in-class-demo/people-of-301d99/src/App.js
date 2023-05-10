// you don't need 'use strict';

// The 3 things you need in every class component you create

// 1. import React
import React from 'react';
// import component files that I want to use in App
import Main from './Main.js';
import Header from './Header';
import Modal from 'react-bootstrap/Modal'
import data from './data.json';
// import the CSS
import './App.css';

// 2. declare the class
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hearts: '',
      isModalDisplaying: false,
      personName: ''
    }
  }

  addHearts = () => {
    this.setState({
      hearts: this.state.hearts + '❤️'
    });
  }

  // handleShowModal('Bob');
  handleShowModal = (name) => {
    this.setState({
      isModalDisplaying: true,
      personName: name
    });
  }

  handleCloseModal = () => {
    this.setState({
      isModalDisplaying: false
    });
  }

  // We need to call a render function that will return our JSX 
  // (JSX is the stuff that looks like HTML)
  render() {
    // <> is called a "Frag" or fractional element
    //  the <> allows use to use multiple tags as siblings
    // it will not render on our page
    return (
      <>
      {/* <p onClick={this.handleShowModal}>click</p> */}
        <Header
          hearts={this.state.hearts}
        />
        <Main
          addHearts={this.addHearts}
          handleShowModal={this.handleShowModal}
          data={data}
        />
        <footer>
          &copy; 2023; Code Fellows
        </footer>
        <Modal
          // show is a boolean, true or false, should the modal display
          show={this.state.isModalDisplaying}
          // onHide is the method that will change the value of our boolean (show)
          onHide={this.handleCloseModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.state.personName}</Modal.Title>
          </Modal.Header>
        </Modal>
      </>
    );
    
  }
};

// 3. export the class
export default App;
