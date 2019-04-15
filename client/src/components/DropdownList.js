import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class DropdownList extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.getListOfCurrencies = this.getListOfCurrencies.bind(this);
    this.setDate = this.setDate.bind(this);

    this.state = {
      dropdownOpen: false,
      currencies: [],
      firstToggle: true
    };
  }

  getListOfCurrencies() {
    for (let i=0; i< this.props.listOfCurrencies.length; i++) {
      this.state.currencies.push(
        <DropdownItem key={i}> {this.props.listOfCurrencies[i]} </DropdownItem>
      );
    }
    this.setState({
      firstToggle: false
    })
  }


  toggle(event) {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));


    if (this.props.changeBaseCurrency) {
      if (this.state.firstToggle===true){
        this.getListOfCurrencies();
      }

      let trimmedString = event.target.textContent.substring(1,4);

      if(event.target.textContent.length <= 5) {
        this.props.changeBaseCurrency(trimmedString, this.props.date);
      }
    }
  }

    setDate(event) {
       if (this.props.changeDate) {
           this.props.changeDate(this.props.baseCurrency, event.target.parentNode.firstChild.value);
       }
    }


  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret color={this.props.color}>
          {this.props.title}
        </DropdownToggle>
        <DropdownMenu modifiers={{
          setMaxHeight: {
            enabled: true,
            order: 890,
            fn: (data) => {
              return {
                ...data,
                styles: {
                  ...data.styles,
                  overflow: 'auto',
                  maxHeight: 100,
                },
              };
            },
          },
        }}>
          {this.props.changeBaseCurrency ? this.state.currencies : <div className="d-flex"><input placeholder="2019-04-12"></input><button onClick={this.setDate}>Set date</button></div>}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default DropdownList;
