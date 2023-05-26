import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

class Content extends React.Component {

  getBooks = async () => {
    if (this.props.auth0.isAuthenticated) {
      // get token:
      const res = await this.props.auth0.getIdTokenClaims();

      // extract the raw token
      // that's a double underscore before raw
      const jwt = res.__raw;
      // for today's lab, all that is required is that you log a token:
      // in the real world you would want to comment out any logging of tokens before you deploy
      console.log(jwt);

      // from the axios docs
      const config = {
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/books',
        headers: {"Authorization": `Bearer ${jwt}`}
      }
      const bookResults = await axios(config);

      // // the way we are used to writing it:
      // let url = `${process.env.REACT_APP_SERVER_URL}/books`;
      // const bookResults = await axios.get(url);
      console.log(bookResults.data);
    }
  }
  componentDidMount(){
    this.getBooks();
  }

  render() {
    console.log(this.props.auth0.user);

    return (
      <>
        <h1>Content page</h1>
      </>
    )
  }
}

export default withAuth0(Content);
