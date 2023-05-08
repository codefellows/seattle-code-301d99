import React from 'react';

class Person extends React.Component {
  render() {
    // all date from parent comes attached to the props object
    console.log(this.props);
    // to access properties on props I drill down like so:
    console.log(this.props.name);

    // in my JSX (the stuff that looks like HTML), I can write JavaScript inside {}
    // in this case i'm just passing a JavaScript variable that contains the name value
    return (
      <article>
        <h3>{this.props.name}</h3>
        <p>somethingelse here</p>
      </article>
    )
  }
}

export default Person;
