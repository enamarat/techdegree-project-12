import React, { Component } from 'react';
import ModalWindowForStocks from './ModalWindowForStocks.js';

class Stock extends Component {
  constructor(props) {
    super(props);
   this.state = {
      latestPrice: this.props.data.columns[1],
      latestTime: this.props.data.columns[2]
    }
  }

  componentDidMount () {
    this.mounted = true;
    this.timerID = setInterval(() => this.updateStockPrice(),2000);
    this.props.addInterval(this.timerID);
  }

  componentWillUnmount() {
    this.mounted = false;
    this.props.removeInterval(this.timerID);
    clearInterval(this.timerID);

  }

   updateStockPrice = async () => {
       await fetch(`/profile/${this.props.data.columns[0].toLowerCase()}`)
       .then(async (response) => {
         const json =  await response.json();
         if (this.mounted === true) {
           this.setState({
             latestPrice: json.quote.latestPrice,
             latestTime: json.quote.latestTime,
           });
         }
    });
    }

     render() {
       return(
         <tr key={this.props.data.key}>
           <td key={(this.props.data.key)*7}> {this.props.data.columns[0]} </td>
           <td key={(this.props.data.key)*7+1} className="price" > {this.state.latestPrice}</td>
           <td key={(this.props.data.key)*7+2}> {this.state.latestTime}</td>
           <td key={(this.props.data.key)*7+3}> {this.props.data.columns[3]}</td>
           <td key={(this.props.data.key)*7+4}> {this.props.data.columns[4]}</td>
           <td key={(this.props.data.key)*7+5}> <ModalWindowForStocks symbol={this.props.data.columns[0]}/> </td>
           <td key={(this.props.data.key)*7+6}> <button onClick={this.props.removeFromWatchlist} className="btn btn-danger"> X </button> </td>
         </tr>
       );
     }
}

export default Stock;
