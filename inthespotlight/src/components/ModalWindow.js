import React from 'react';
import { Button, Modal, ModalHeader, ModalBody  } from 'reactstrap';


class ModalWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      submitted: false
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      submitted: false
    }));

    if (this.state.email) {
      this.setState({
        email: undefined
      });
    }

    if (this.state.password) {
      this.setState({
        password: undefined
      });
    }

  }

  handleChange(event) {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value
    });

  }

  handleSubmit(event) {
    this.setState({
      submitted: true
    });
    event.preventDefault();
  }


  render() {
    return (
      <div>
        <Button color={this.props.buttonColor} onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.buttonLabel}</ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange}/>

                 {/*If a button "Sign Up" is clicked, additional message appears under the input field*/}
                 {
                  this.props.signUp==="true" &&
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                 }

                  {/* If email input field is empty, show warning */}
                  {
                    !this.state.email && this.state.submitted === true ?
                     <small id="emailWarning" className="form-text text-danger">Please enter email</small> : null
                  }
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handleChange}/>

                {/*If password input field is empty, show warning */}
                {
                  !this.state.password && this.state.submitted === true ?
                   <small id="passwordWarning" className="form-text text-danger">Please enter password</small> : null
                }
              </div>

              <button type="submit" className="btn btn-danger" onClick={this.handleSubmit}>Submit</button>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

// /*A function which checks format of email*/
// const validateEmail = (emailAddress) => {
//   const mailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
//   return mailFormat.test(emailAddress.value);
// }
// /* If typed email is in wrong format form is prevented from
// submission and error message appears*/
// validateEmail(email);
// if (!validateEmail(email) && email.value.length > 0) {
//   e.preventDefault();
//   document.querySelectorAll('label')[1].textContent = "Invalid format of email";
//   document.querySelectorAll('label')[1].setAttribute("class", "warning");
//   email.setAttribute("class", "warning-field");
// }

export default ModalWindow;
