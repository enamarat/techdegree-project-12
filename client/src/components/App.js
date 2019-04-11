import React, { Component } from 'react';
import LandingPage from './LandingPage.js';
import Profile from './Profile.js';
import NotFound from './NotFound.js';
import Logout from './Logout.js';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/register" render={()=> <LandingPage register="true" />} />
          <Route path="/login" render={()=> <LandingPage login="true" />} />
          <Route path="/profile" render={()=><Profile />} />
          <Route path="/logout" render={()=> <Logout/>} />
          <Route component={NotFound}/>
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
