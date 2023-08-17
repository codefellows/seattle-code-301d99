import React from 'react';
import Container from 'react-bootstrap/Container';
import Parent from './Parent';
import Header from './Header';
import OverdraftModal from './OverdraftModal';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showOverdraftWarning: false,
    };
  }

  overdraftHandler = () => {
    this.setState({ showOverdraftWarning: true });
  }

  closeHandler = () => {
    this.setState({ showOverdraftWarning: false });
  }

  render() {
    return (
      <Container>
        <Header title={'Billy is a teenager'} />
        <Parent onOverdraft={this.overdraftHandler} />
        <OverdraftModal show={this.state.showOverdraftWarning} onClose={this.closeHandler} />
      </Container>
    );
  }
}

export default App;
