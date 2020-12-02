import React from 'react';
import { Button, Modal, ModalHeader, ModalBody  } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class ModalWindowForStocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  toggle = (event) => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));

    // Create a new route when a modal window is opened
    if (this.state.modal===false) {
      let path = `/profile/${this.props.symbol.toLowerCase()}/historic-prices`;
      this.props.history.push(path);
    }

    if (this.state.modal===true) {
      let path = `/profile`;
      this.props.history.push(path);
    }
  }

  // Pass date from input field to a request sent to API
  setDate = async (event) => {
    let dateInput = event.target.parentNode.firstChild.value;
    const api_url = `/profile/${this.props.symbol.toLowerCase()}/historic-prices/${dateInput}`;
    const response = await fetch(api_url);
    const json = await response.json();
    this.setState({
      json: json
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle} color="secondary" size="sm"> Click me! </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}> Historic prices of <span className="operational-data"> {this.props.symbol} </span> </ModalHeader>

          <ModalBody>
              <div>
                <input placeholder="20190412"/>
                <button onClick={this.setDate} className="btn btn-warning"> Set date </button>
                {/* Show historic prices only if date is provided and button "Set date" is clicked */}
                {this.state.json  && this.state.json.length > 0 ?
                  <p> {`The price of`} <span className="operational-data">{`${this.props.symbol}`}</span> {`on`} <span className="operational-data"> {`${this.state.json[this.state.json.length-1].date}`} </span> {`at market close was`} <span className="operational-data"> {`${this.state.json[this.state.json.length-1].close}`} </span> {`$.`} </p>
                   : null}
                   {this.state.json  && this.state.json.length === 0 ? <p> {`Sorry! No data available!`} </p> : null}
              </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default withRouter(ModalWindowForStocks);
