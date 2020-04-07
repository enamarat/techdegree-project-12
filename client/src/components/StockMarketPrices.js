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
      loading: true,
      noTickersInWatchlist: false
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
    const inputValue = event.target.parentNode.firstChild.value;
    // prevent sending of an API request, if it has already been sent with the same ticker
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

  updateLoadingStatus = () => {
    this.setState({
      loading: false,
      noTickersInWatchlist: false
    });
  }

  removeFromWatchlist = async (event) => {
    const symbol = event.target.parentNode.parentNode.firstChild.textContent.trim();
    for(let i = 0; i < this.state.chosenTickers.length; i++) {
      if (this.state.chosenTickers[i].symbol === symbol) {
        let index = this.state.chosenTickers.indexOf(this.state.chosenTickers[i]);
        this.state.chosenTickers.splice(index, 1)
        this.setState({
          chosenTickers: this.state.chosenTickers
        })
      }
    }

    for (let r = 0; r < this.state.rows.length; r++) {
     if (this.state.rows[r].props.children[0].props.children[1].trim() === symbol) {
         let index = this.state.rows.indexOf(this.state.rows[r]);
         this.state.rows.splice(index, 1);
         this.setState({
           rows: this.state.rows
         });
     }
    }

  // delete symbol from a database
  const url = `/profile/delete/${symbol}`;
  const response = await fetch(url);
  const json = await response.json();
  console.log(json);

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

        this.state.tableData.push(<td key={this.state.count}> <ModalWindowForStocks symbol={this.state.chosenTickers[this.state.chosenTickers.length-1].symbol} /> </td>);
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
     window.setTimeout(this.updateStockPrice, 1000);
  }

  updateStockPrice = async () => {
    /* const timer = window.setInterval(countItDown, 1000);
    window.clearInterval(timer);*/
    const existingRows = document.querySelectorAll("#stocks tbody tr");
    const lastRow = document.querySelectorAll("#stocks tbody tr")[existingRows.length-1];
    const columnOfTheSymbol = lastRow.querySelectorAll("td")[0];
    const columnOfTheLatestPrice = lastRow.querySelectorAll("td")[1];
    columnOfTheLatestPrice.style.color = "blue";
    columnOfTheLatestPrice.style.fontWeight = "bold";

    const api_url = `/profile/${columnOfTheSymbol.textContent.trim().toLowerCase()}`;
    const response = await fetch(api_url);
    const json2 = await response.json();

    console.log(json2.quote.latestPrice);
    console.log(json2.quote.latestTime);
    columnOfTheLatestPrice.textContent = json2.quote.latestPrice;


    //latestTime: this.state.json.quote.latestTime;

    /*for(let i = 0; i < this.state.chosenTickers.length; i++) {
      if (this.state.chosenTickers[i].symbol === columnOfTheSymbol.textContent.trim()) {

      }
    }*/
  }


  makeAnAPIReguest = async (symbol) => {
    const api_url = `/profile/${symbol}`;
    const response = await fetch(api_url);
    const json = await response.json();
    this.setState({
        json: json
      });
      console.log(json.quote.latestPrice);
    this.getStockPrices();
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

  componentDidMount () {
    if (this.props.isLoggedIn) {
        this.retrieveTickersFromDatabase();
      }
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
          : <table className="mx-auto mt-3" id="stocks">
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
