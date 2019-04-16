import React, { Component } from 'react';
import axios from 'axios';
//import DropdownList from './DropdownList.js';


class StockMarketPrices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenTickers: [],
      rows: [],
      tableData: [],
      count: 0,
      loading: true
    }
    this.searchByTicker = this.searchByTicker.bind(this);
    this.getStockPrices = this.getStockPrices.bind(this);
    this.generateStockTable = this.generateStockTable.bind(this);
    this.updateLoadingStatus = this.updateLoadingStatus.bind(this);
    this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
  }

  getStockPrices(ticker) {
    axios
     .get(`https://api.unibit.ai/realtimestock/${ticker}?size=1&datatype=json&AccessKey=03Kv7Ghg8iQ5fKhjadGlfUAx90T-miwc`)
     .then((response) => {

       let formattedDate = response.data[0].date.slice(0,4) + "-" + response.data[0].date.slice(4,6) + "-" + response.data[0].date.slice(6,8);

       this.state.chosenTickers.push(
         {
        ticker: response.data[0].ticker,
        price: response.data[0].price,
        date: formattedDate,
        time: response.data[0].minute
          }
      );
        this.generateStockTable();
     })
     .catch(err => {
       console.error(err);
     });
  }

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
      if (this.state.chosenTickers[i].ticker === event.target.parentNode.parentNode.firstChild.textContent) {

        let index = this.state.chosenTickers.indexOf(this.state.chosenTickers[i]);
        this.state.chosenTickers.splice(index, 1)
        this.setState({
          chosenTickers: this.state.chosenTickers
        })

      }
    }


    for (let r = 0; r < this.state.rows.length; r++) {
     if (this.state.rows[r].props.children[0].props.children === event.target.parentNode.parentNode.firstChild.textContent) {
         let index = this.state.rows.indexOf(this.state.rows[r]);
         this.state.rows.splice(index, 1);
         this.setState({
           rows: this.state.rows
         })

         this.state.tableData.splice((index*5), 5);
         this.setState({
           tableData: this.state.tableData
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
              <td key={this.state.count}>{this.state.chosenTickers[this.state.chosenTickers.length-1][property]}</td>
          );
        }
     }
     this.setState(prevState=>({
       count: this.state.count + 1
     }));
     this.state.tableData.push(<td key={this.state.count}> <button onClick={this.removeFromWatchlist}> Remove </button> </td>);

     this.state.rows.push(
       <tr key={this.state.chosenTickers.length-1}>
         {this.state.tableData[(this.state.chosenTickers.length-1)*5]}
         {this.state.tableData[((this.state.chosenTickers.length-1)*5)+1]}
         {this.state.tableData[((this.state.chosenTickers.length-1)*5)+2]}
         {this.state.tableData[((this.state.chosenTickers.length-1)*5)+3]}
         {this.state.tableData[((this.state.chosenTickers.length-1)*5)+4]}
       </tr>
     );
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
      <div className="col">
        <h3> Stock market prices on <span className="operational-data"> </span> </h3>
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
                <td className="columnTitle"> ticker</td>
                <td className="columnTitle"> price </td>
                <td className="columnTitle"> date </td>
                <td className="columnTitle"> time </td>
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
