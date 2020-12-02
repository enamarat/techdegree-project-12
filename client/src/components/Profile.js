import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import CurrencyExchangeRates from './CurrencyExchangeRates.js';
import StockMarketPrices from './StockMarketPrices.js';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    return axios
     .get('/profile')
     .then((response) => {
       if(response.data.user.email) {
         this.setState({
           user: response.data.user.email,
           isLoggedIn: true
         });
       }
       if(response.status === 403) {
         this.props.history.push(`/login`);
       }
     })
     .catch(err => {
       console.error(err);
     });
  }

  render() {
    return(
      <div>
      {this.state.isLoggedIn ? <div>
        <div className="d-flex justify-content-end mt-3 mr-3">
          <p className="mr-2"> You are signed in as <span id="user">{this.state.user}</span> </p>
          <NavLink to="/logout"><button className="btn btn-danger" onClick={this.clearIntervals}>  Log out  </button></NavLink>
        </div>

        <div className="row mx-auto">
          <CurrencyExchangeRates isLoggedIn={this.state.isLoggedIn} />
          <StockMarketPrices isLoggedIn={this.state.isLoggedIn} />
        </div>

        </div> : <h3 className="mt-5"> Loading... </h3> }
      </div>
    );
  }
}

export default withRouter(Profile);
