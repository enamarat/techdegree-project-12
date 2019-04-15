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
    this.getUserData = this.getUserData.bind(this);

  }

  /*Get data from Express server */
  getUserData() {
    return axios
     .get('/profile')
     .then((response) => {

       if(response.data.email) {
         this.setState({ user: response.data.email});
       }

       if(response.data.status === 403) {
         this.props.history.push(`/login`);
       }
     })
     .catch(err => {
       console.error(err);
     });
  }

  componentDidMount() {
    this.getUserData();
  }


  render() {
    return(
      <div>

        <div className="d-flex justify-content-end mt-3 mr-3">
          <p className="mr-2"> You are signed in as <span id="user">{this.state.user}</span> </p>
          <NavLink to="/logout"><button className="btn btn-danger">  Log out  </button></NavLink>
        </div>

        <div className="row mx-auto">
          <CurrencyExchangeRates  />
          <StockMarketPrices />
        </div>

      </div>
    );
  }
}



export default withRouter(Profile);
