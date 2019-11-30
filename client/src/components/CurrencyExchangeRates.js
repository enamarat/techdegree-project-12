import React, { Component } from 'react';
import DropdownList from './DropdownList.js';
import axios from 'axios';

class CurrencyExchangeRates extends Component {
  constructor(props) {
    super(props);
    this.state = {
        listOfCurrencies: []
    };
    this.getExchangeRates = this.getExchangeRates.bind(this);
    this.generateGrid = this.generateGrid.bind(this);
    this.extractListOfCurrencies = this.extractListOfCurrencies.bind(this);
    this.changeBaseCurrency = this.changeBaseCurrency.bind(this);
  }

  // Save list of currencies in the component's state for the sake of passing it to a child component
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
    .get('https://api.exchangerate-api.com/v4/latest/USD')
    .then((response) => {
  //    console.log(response);
      this.setState({
        date: response.data.date,
        baseCurrency: response.data.base,
        rates: response.data.rates
      });
      this.extractListOfCurrencies();
    });
  }


  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.getExchangeRates();
    }
  }

    // Generate table which will render data from the API's request
     generateGrid() {
       let rows = [];
       let count = 0;
       for (let property in this.state.rates) {
         if (this.state.rates.hasOwnProperty(property)) {
           count += 1;

           rows.push(
             <tr key={count}>
               <td>{property}</td>
               <td>{this.state.rates[property]}</td>
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

     /* This method is passed to a child component as a prop.
        It allows child component to change parameters in API requests */
     changeBaseCurrency(currency) {
       axios
      .get(`https://api.exchangerate-api.com/v4/latest/${currency}`)
      .then(
        (response) => {

        this.setState({
          date: response.data.date,
          baseCurrency: response.data.base,
          rates: response.data.rates
        });

      })
    }


render () {
  return(
    <div className="col-lg-5 col-md-12">
      <h3> Foreign exchange rates on <span className="operational-data">{this.state.date}</span> </h3>
      <h4> Base currency: <span className="operational-data">{this.state.baseCurrency}</span> </h4>
      <div className="d-flex justify-content-center">
        <DropdownList color="primary" title="Select base currency" date={this.state.date} baseCurrency={this.state.baseCurrency} changeBaseCurrency={this.changeBaseCurrency} listOfCurrencies={this.state.listOfCurrencies}/>

      {/* Temporarily unavailable*/}
      {/*<DropdownList color="secondary" title="Select date" date={this.state.date} baseCurrency={this.state.baseCurrency} changeDate={this.changeBaseCurrency} />*/}

      </div>
      {this.generateGrid()}
    </div>
    )
  }
}


export default CurrencyExchangeRates;
