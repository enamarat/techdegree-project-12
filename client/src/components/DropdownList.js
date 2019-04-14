import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class DropdownList extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.getListOfCurrencies = this.getListOfCurrencies.bind(this);

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

    if (this.state.firstToggle===true){
      this.getListOfCurrencies();
    }

    let trimmedString = event.target.textContent.substring(1,4);

    if(event.target.textContent.length <= 5) {
      this.props.changeBaseCurrency(trimmedString);
    }
    
  }



  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Select base currency
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
          {this.state.currencies}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default DropdownList;
