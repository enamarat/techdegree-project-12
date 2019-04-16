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
    this.changeBaseCurrencyOrDate = this.changeBaseCurrencyOrDate.bind(this);
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
    this.getExchangeRates();
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

     /* This method is passed to a child component as a prop.
        It allows child component to change parameters in API requests */
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


render () {
  return(
    <div className="col-md-6 col-sm-12">
      <h3> Foreign exchange rates on <span className="operational-data">{this.state.date}</span> </h3>
      <h4> Base currency: <span className="operational-data">{this.state.baseCurrency}</span> </h4>
      <div className="d-flex justify-content-center">
        <DropdownList color="primary" title="Select base currency" date={this.state.date} baseCurrency={this.state.baseCurrency} changeBaseCurrency={this.changeBaseCurrencyOrDate} listOfCurrencies={this.state.listOfCurrencies}/>
        <DropdownList color="secondary" title="Select date" date={this.state.date} baseCurrency={this.state.baseCurrency} changeDate={this.changeBaseCurrencyOrDate} />
      </div>
      {this.generateGrid()}
    </div>
    )
  }
}


export default CurrencyExchangeRates;
