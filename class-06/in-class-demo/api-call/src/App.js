import React from 'react';
import axios from 'axios'; // axios is an object that has several methods 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starWarsData: [],
      cityName: '',
      cityData: {},
      error: false,
      errorMessage: ''
    }
  }

  // WHEN DEALING WITH AXIOS YOU NEED 3 things:
  // - 1) async
  // - 2) await
  // - 3) .data
  handleSWSubmit = async (event) => {
    event.preventDefault();

    try {
      // the code you put inside the "try" block is kind of like the condition for an if else
      // get the star Wars data from the API
      // .get() makes a request to an API
      // it take in a URL (as a string) as a parameter
      let swChars = await axios.get('https://www.swapi.tech/api/people/?page=1');
      // proof of life
      // console.log(swChars.data.results);
      // save it in state
      this.setState({
        starWarsData: swChars.data.results,
        error: false
      });
    } catch (error) {
      console.log('error: ', error);
      console.log('error.message: ', error.message);
      this.setState({
        error: true,
        errorMessage: `An Error Occured: ${error.response.status}`
      })
    }
  }


  

  handleLocationSubmit = async (e) => {
    e.preventDefault();

    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`;

    let cityData = await axios.get(url);

    // proof of life:
    console.log(cityData.data);

    this.setState({
      cityData: cityData.data[0]
    });
    //  console.log(this.state.cityName);
  }

  changeCityInput = (e) => {
    this.setState({
      cityName: e.target.value
    });
  }

  render() {
    // console.log(this.state.cityData)
    // let swList = this.state.starWarsData.map((char, idx) => {
    //     // console.log(char);
    //     return <li key={idx}>{char.name}</li>;
    //   });

    let swList= this.state.starWarsData.map((char, idx) => {
      // console.log(idx);
      // console.log(swData);
      return <li key={idx}>{char.name}</li>
    })

    /// let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=47.6038321,-122.330062&zoom=12`

    return (
      <>
        <h1>Data from an API</h1>
        <form onSubmit={this.eventHandler}>
          <button type="submit">Display Star Wars data</button>
        </form>

        {this.state.error
          ?
          <p>{this.state.errorMessage}</p>
          :
          <ul>
            {swList}
          </ul>
        }
        

        <form onSubmit={this.handleLocationSubmit}>
          <label>Search for a City:
            <input name="city" onChange={this.changeCityInput}/>
          </label>
          <button type="submit">Get Location data</button>
        </form>
      </>
    );
  }
}

export default App;



/*

    try {
      // the code you put inside the "try" block is kind of like the condition for an if else

    } catch(error) {
      // if the code in the try fails. the "catch" code runs
    }




*/
