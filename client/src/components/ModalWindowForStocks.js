import React from 'react';
import { Button, Modal, ModalHeader, ModalBody  } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class ModalWindowForStocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  toggle(event) {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));

    // If modal window is reopened, previous data it displayed will be erased
    if (this.state.date && this.state.stockPrice) {
      this.setState({
        date: undefined,
        stockPrice: undefined
      });
    }

    // Rise from event.target to table row and find its first child which is a stock's ticker, pass it to state
    if (this.state.modal === false) {
      this.setState({
        symbol: event.target.parentNode.parentNode.parentNode.firstChild.textContent.trim(),
      });
    }
  }

  // Pass date from input field to a request sent to API
  setDate(event) {
    let dateInput = event.target.parentNode.firstChild.value;

    let formattedDate = `${dateInput[0]}${dateInput[1]}${dateInput[2]}${dateInput[3]}-${dateInput[4]}${dateInput[5]}-${dateInput[6]}${dateInput[7]}`;

    axios
     .get(`https://api.iextrading.com/1.0/stock/${this.state.symbol}/chart/date/${dateInput}`)
     .then( (response) => {
       this.setState({
         stockPrice: response.data[response.data.length-1].marketClose,
         date: formattedDate
       });

     })
    .catch(err => {
      console.error(err);
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle} color="secondary" size="sm"> Click me! </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}> Historic prices </ModalHeader>

          <ModalBody>
              <div>
                <input placeholder="20190412"/>
                <button onClick={this.setDate} className="btn btn-warning"> Set date </button>
                {/* Show historic prices only if date is provided and button "Set date" is clicked */}
                {this.state.symbol && this.state.date && this.state.stockPrice ?
                  <p> {`The price of`} <span className="operational-data">{`${this.state.symbol}`}</span> {`on`} <span className="operational-data"> {`${this.state.date}`} </span> {`at market close was`} <span className="operational-data"> {`${this.state.stockPrice}`} </span> {`$.`} </p>
                   : null}
              </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}


export default withRouter(ModalWindowForStocks);
