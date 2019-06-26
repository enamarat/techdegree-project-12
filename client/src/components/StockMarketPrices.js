import React, { Component } from 'react';
import axios from 'axios';
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
    this.searchByTicker = this.searchByTicker.bind(this);
    this.getStockPrices = this.getStockPrices.bind(this);
    this.generateStockTable = this.generateStockTable.bind(this);
    this.updateLoadingStatus = this.updateLoadingStatus.bind(this);
    this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
  }

  // Function sends a request to API, data from the response is saved in component's state
  getStockPrices(symbol) {
    axios
     .get(`https://api.iextrading.com/1.0/stock/${symbol}/book?filter=symbol,latestPrice,latestTime,peRatio,previousClose`)
     .then((response) => {

       let formattedSymbol = response.data.quote.symbol.trim();

       this.state.chosenTickers.push(
         {
            symbol: formattedSymbol,
            latestPrice: response.data.quote.latestPrice,
            latestTime: response.data.quote.latestTime,
            peRatio: response.data.quote.peRatio,
            previousClose: response.data.quote.previousClose
          }
      );
        this.generateStockTable();
     })
     .catch(err => {
       console.error(err);
     });
  }

  // Function inserts value of input field into request's query
  searchByTicker(event) {
    this.getStockPrices(event.target.parentNode.firstChild.value);
  }

  updateLoadingStatus() {
    this.setState({
      loading: false
    });
  }

  removeFromWatchlist(event) {
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

  generateStockTable() {
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

        this.state.tableData.push(<td key={this.state.count}> <ModalWindowForStocks /> </td>);

         this.setState(prevState=>({
           count: this.state.count + 1
         }));

     this.state.tableData.push(<td key={this.state.count}> <button onClick={this.removeFromWatchlist}> Remove </button> </td>);

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

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.getStockPrices('aapl');
      this.getStockPrices('twtr');
      this.getStockPrices('tsla');
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
            <button onClick={this.searchByTicker}>Search by ticker!</button>
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
