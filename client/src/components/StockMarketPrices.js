import React, { Component } from 'react';
import ModalWindowForStocks from './ModalWindowForStocks.js';


class StockMarketPrices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenTickers: [],
      rows: [],
      tableData: [],
      count: 0,
      countRow: 0,
      loading: true
    }
  }

  // Function which saves data from the response of an API request in component's state
  getStockPrices = () => {
       let formattedSymbol = this.state.json.quote.symbol.trim();
       this.state.chosenTickers.push({
            symbol: formattedSymbol,
            latestPrice: this.state.json.quote.latestPrice,
            latestTime: this.state.json.quote.latestTime,
            peRatio: this.state.json.quote.peRatio,
            previousClose: this.state.json.quote.previousClose
          });
        this.generateStockTable();
  }

  // Function inserts value of input field into request's query
  searchByTicker = (event) => {
    this.makeAnAPIReguest(event.target.parentNode.firstChild.value);
  }

  updateLoadingStatus = () => {
    this.setState({
      loading: false
    });
  }

  removeFromWatchlist = (event) => {
    for(let i = 0; i < this.state.chosenTickers.length; i++) {
      if (this.state.chosenTickers[i].symbol === event.target.parentNode.parentNode.firstChild.textContent.trim()) {

        let index = this.state.chosenTickers.indexOf(this.state.chosenTickers[i]);
        this.state.chosenTickers.splice(index, 1)
        this.setState({
          chosenTickers: this.state.chosenTickers
        })
      }
    }

    for (let r = 0; r < this.state.rows.length; r++) {
     if (this.state.rows[r].props.children[0].props.children[1].trim() === event.target.parentNode.parentNode.firstChild.textContent.trim()) {

         let index = this.state.rows.indexOf(this.state.rows[r]);
         this.state.rows.splice(index, 1);
         this.setState({
           rows: this.state.rows
         })
     }
    }
  }

  generateStockTable = () => {
      for (let property in this.state.chosenTickers[this.state.chosenTickers.length-1]) {
        if (this.state.chosenTickers[this.state.chosenTickers.length-1].hasOwnProperty(property)) {
          this.setState(prevState=>({
            count: this.state.count + 1
          }));

          this.state.tableData.push(
              <td key={this.state.count}> {this.state.chosenTickers[this.state.chosenTickers.length-1][property]} </td>
          );
        }
     }

     this.setState(prevState=>({
       count: this.state.count + 1
     }));

        this.state.tableData.push(<td key={this.state.count}> <ModalWindowForStocks symbol={this.state.chosenTickers[this.state.countRow].symbol} /> </td>);
         this.setState(prevState=>({
           count: this.state.count + 1
         }));

     this.state.tableData.push(<td key={this.state.count}> <button onClick={this.removeFromWatchlist} className="btn btn-warning"> Remove </button> </td>);

     this.state.rows.push(
       <tr key={this.state.countRow}>
         {this.state.tableData[(this.state.countRow)*7]}
         {this.state.tableData[((this.state.countRow)*7)+1]}
         {this.state.tableData[((this.state.countRow)*7)+2]}
         {this.state.tableData[((this.state.countRow)*7)+3]}
         {this.state.tableData[((this.state.countRow)*7)+4]}
         {this.state.tableData[((this.state.countRow)*7)+5]}
         {this.state.tableData[((this.state.countRow)*7)+6]}
       </tr>
     );

     this.setState({
       countRow: this.state.countRow + 1
     });

     this.updateLoadingStatus();
  }


  makeAnAPIReguest = async (symbol) => {
    const api_url = `/profile/${symbol}`;
    const response = await fetch(api_url);
    const json = await response.json();
    this.setState({
      json: json
    });
    this.getStockPrices();
  }

  componentDidMount() {
      if (this.props.isLoggedIn) {
        this.makeAnAPIReguest('aapl');
      }
    }

  render () {
    return(
      <div className="col mt-3">
        <h3> Stock market prices </h3>
        <h4> Add a ticker to your <span className="operational-data"> watchlist </span> </h4>
        <div className="d-flex-center">
          <div>
            <input placeholder="aapl"></input>
            <button onClick={this.searchByTicker} className="btn btn-primary">Search by ticker!</button>
          </div>
          {
            this.state.loading===true ?
            <p className="mt-3"> Loading... </p>
          : <table className="mx-auto mt-3">
            <thead>
              <tr>
                <td className="columnTitle"> symbol </td>
                <td className="columnTitle"> latest price </td>
                <td className="columnTitle"> latest time </td>
                <td className="columnTitle"> peRatio </td>
                <td className="columnTitle"> previousClose </td>
                <td className="columnTitle"> historic prices </td>
                <td className="columnTitle"> remove </td>
              </tr>
            </thead>
            <tbody>
              {this.state.rows}
            </tbody>
          </table>
          }
        </div>
      </div>
      )
    }
  }




export default StockMarketPrices;
