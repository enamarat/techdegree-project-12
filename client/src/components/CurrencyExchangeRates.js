import React, { Component } from 'react';
import DropdownList from './DropdownList.js';


class CurrencyExchangeRates extends Component {

render () {
  return(
    <div className="col-md-6 col-sm-12">
      <h3> Foreign exchange rates on <span className="operational-data">{this.props.date}</span> </h3>
      <h4> Base currency: <span className="operational-data">{this.props.baseCurrency}</span> </h4>
      <div className="d-flex justify-content-center">
        <DropdownList className="mr-2" color="primary" title="Select base currency" date={this.props.date} baseCurrency={this.props.baseCurrency} changeBaseCurrency={this.props.changeBaseCurrencyOrDate} listOfCurrencies={this.props.listOfCurrencies}/>
        <DropdownList color="secondary" title="Select date" date={this.props.date} baseCurrency={this.props.baseCurrency} changeDate={this.props.changeBaseCurrencyOrDate} />
      </div>
      {this.props.generateGrid()}
    </div>
    )
  }
}


export default CurrencyExchangeRates;
