import React, { Component } from 'react';
//import DropdownList from './DropdownList.js';


class StockMarketPrices extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return(
      <div className="col">
        <h3> Stock market prices on <span className="operational-data"> Hi </span> </h3>
        <h4> Chosen stocks: <span className="operational-data">  Bye </span> </h4>
      </div>
      )
    }
  }


export default StockMarketPrices;
