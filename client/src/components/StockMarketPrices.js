import React, { Component } from 'react';
import Stock from './Stock.js';

class StockMarketPrices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenTickers: [],
      rows: [],
      countRow: 0,
      loading: true,
      noTickersInWatchlist: false,
      intervals: []
    }
  }

  componentDidMount () {
    if (this.props.isLoggedIn) {
        this.retrieveTickersFromDatabase();
      }
    }

  componentWillUnmount() {
    for (let i = 0; i < this.state.intervals; i++) {
      clearInterval(this.state.intervals[i]);
    }
  }

  addInterval = (newElement) => {
    this.setState(prevState => ({
      intervals: [...prevState.intervals, newElement]
    }));
  }

  removeInterval = (element) => {
    let newArray = [...this.state.intervals].filter(interval=>interval!==element);
    this.setState(prevState => ({
      intervals: [...newArray]
    }));
  }

  updateLoadingStatus = () => {
    this.setState({
      loading: false,
      noTickersInWatchlist: false
    });
  }

    retrieveTickersFromDatabase = async () => {
      const url = `/profile`;
      const response = await fetch(url);
      const json = await response.json();

      if (json.user.watchedTickers.length > 0) {
        json.user.watchedTickers.forEach(ticker => {
          this.makeAnAPIReguest(ticker.name);
        });
      } else if (json.user.watchedTickers.length === 0) {
        this.setState({
          loading: false,
          noTickersInWatchlist: true
        });
      }
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

  getStockPrices = () => {
       let formattedSymbol = this.state.json.quote.symbol.trim();
       this.state.chosenTickers.push({
            symbol: formattedSymbol,
            latestPrice: this.state.json.quote.latestPrice,
            latestTime: this.state.json.quote.latestTime,
            peRatio: this.state.json.quote.peRatio,
            previousClose: this.state.json.quote.previousClose,
            tableData: []
          });
        this.generateStockTable();
  }

  generateStockTable = () => {
   /*** Columns ***/
    for (let property in this.state.chosenTickers[this.state.chosenTickers.length-1]) {
      this.state.chosenTickers[this.state.chosenTickers.length-1].tableData.push(this.state.chosenTickers[this.state.chosenTickers.length-1][property]);
    }
    /*** Rows ***/
    const data = {
      key: this.state.countRow,
      columns: this.state.chosenTickers[this.state.chosenTickers.length-1].tableData
    };

    this.state.rows.push(
      <Stock
       key={this.state.countRow}
      data={data}
      removeFromWatchlist={this.removeFromWatchlist}
      addInterval={this.addInterval}
      removeInterval={this.removeInterval}/>
    );

     this.setState(prevState=>({
       countRow: this.state.countRow + 1
     }));

     this.updateLoadingStatus();
  }

  searchByTicker = (event) => {
    const inputValue = event.target.parentNode.firstChild.value;
    let tickerHasAlreadyBeenAddedToWatchlist = false;
    if (this.state.chosenTickers.length > 0) {
      this.state.chosenTickers.forEach(ticker => {
        if (inputValue.toUpperCase() === ticker.symbol) {
          tickerHasAlreadyBeenAddedToWatchlist = true;
        }
      });

    if (tickerHasAlreadyBeenAddedToWatchlist === false) {
        if (inputValue.length !== 0) {
          this.makeAnAPIReguest(inputValue);
        } else {
          alert("Please type something into the input field!");
        }
      } else if (tickerHasAlreadyBeenAddedToWatchlist === true) {
         alert("You have already added this ticker to your watchlist!");
         tickerHasAlreadyBeenAddedToWatchlist = false;
      }
    } else if (this.state.chosenTickers.length === 0) {
      this.makeAnAPIReguest(inputValue);
    }
    document.querySelector("#search").value = "";
  }

  removeFromWatchlist = async (event) => {
    const symbol = event.target.parentNode.parentNode.firstChild.textContent.trim();
    this.setState({
      chosenTickers: this.state.chosenTickers.filter(element => element.symbol !== symbol),
      rows: this.state.rows.filter(element => element.props.data.columns[0].trim() !== symbol)
    });
    await fetch(`/profile/${symbol}`, {method: 'delete'}).then(response=>response.json());
  }

  render () {
    return(
      <div className="col mt-3">
        <h3> Stock market prices </h3>
        <h4> Add a ticker to your <span className="operational-data"> watchlist </span> </h4>
        <div className="d-flex-center">
          <div>
            <input id="search" placeholder="aapl"></input>
            <button onClick={this.searchByTicker} className="btn btn-primary">Search by ticker!</button>
          </div>
          {
            this.state.loading===true ?
            <p className="mt-3"> Loading... </p>
          : <div className="mx-auto mt-3">
          <div className="source"> <a href="https://iexcloud.io">Data provided by IEX Cloud</a></div>
          <table  id="stocks">
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
          </div>
          }
          {
            this.state.noTickersInWatchlist===true?
            <p className="mt-3"> You haven't added any tickers to your watchlist yet. </p>
            : null
          }
        </div>
      </div>
      )
    }
  }
export default StockMarketPrices;
