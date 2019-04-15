import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {NavLink} from 'react-router-dom';

import CurrencyExchangeRates from './CurrencyExchangeRates.js';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        listOfCurrencies: []
    };
    this.getUserData = this.getUserData.bind(this);
    this.getExchangeRates = this.getExchangeRates.bind(this);
    this.generateGrid = this.generateGrid.bind(this);
    this.extractListOfCurrencies = this.extractListOfCurrencies.bind(this);
    this.changeBaseCurrencyOrDate = this.changeBaseCurrencyOrDate.bind(this);
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

  extractListOfCurrencies() {
    for (let property in this.state.rates) {
      if (this.state.rates.hasOwnProperty(property)) {
      this.state.listOfCurrencies.push(property);
      }
    }
  }

  /* Get currency data from Foreign exchange rates API*/
  getExchangeRates() {
     axios
    .get('https://api.exchangeratesapi.io/latest?base=USD')
    .then((response) => {
      this.setState({
        date: response.data.date,
        baseCurrency: response.data.base,
        rates: response.data.rates
      });
      this.extractListOfCurrencies();
    });
  }


  componentDidMount() {
    this.getUserData();
    this.getExchangeRates();
  }


   generateGrid() {
     let rows=[];
     // let rowsWithKeys = rows.map((i, row) => {
     //   rows[i].setAttribute("key", i);
     // });
     let count=0;
     for (let property in this.state.rates) {
       if (this.state.rates.hasOwnProperty(property)) {
         count += 1;
       //  console.log(property + ': ' + this.state.rates[property]);

         rows.push(
           <tr key={count}>
             <td>{property}</td>
             <td>{this.state.rates[property] }</td>
           </tr>
         );
       }
     }

     return(
       <table className="mx-auto mt-3">
         <thead>
           <tr>
             <td className="columnTitle"> counter currency </td>
             <td className="columnTitle"> rate </td>
           </tr>
         </thead>
         <tbody>
         {rows}
         </tbody>
       </table>
     );
   }

   changeBaseCurrencyOrDate(currency, date) {
     axios
    .get(`https://api.exchangeratesapi.io/${date}?base=${currency}`)
    .then(
      (response) => {

      this.setState({
        date: response.data.date,
        baseCurrency: response.data.base,
        rates: response.data.rates
      });

    })
  }


  render() {
    return(
      <div>

        <div className="d-flex justify-content-end mt-3 mr-3">
          <p className="mr-2"> You are signed in as <span id="user">{this.state.user}</span> </p>
          <NavLink to="/logout"><button className="btn btn-danger">  Log out  </button></NavLink>
        </div>

        <div className="row mx-auto">
          <CurrencyExchangeRates
          generateGrid={this.generateGrid}
          date={this.state.date}
          baseCurrency={this.state.baseCurrency}
          changeBaseCurrencyOrDate={this.changeBaseCurrencyOrDate}
          listOfCurrencies={this.state.listOfCurrencies}
          />
          <div className="col">
            <h3> Stock market prices on <span className="operational-data">  </span> </h3>
            <h4> Chosen stocks: <span className="operational-data">  </span> </h4>
          </div>
        </div>

      </div>
    );
  }
}

//{this.generateGrid()}

export default withRouter(Profile);
