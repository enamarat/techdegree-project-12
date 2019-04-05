import React, { Component } from 'react';
import LandingPage from './LandingPage.js'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';


class App extends Component {
  state = { users: []}

  componentDidMount() {
    // fetch('/users').
    // then(res => res.json()).
    // then(users => this.setState({users}))
  }


  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;



// <h1> Users </h1>
// <ul>
// {  this.state.users.map(user =>
//   <li key={user.id}> {user.user}</li>
// )}
// </ul>
