import React from 'react';
import { Button, Modal, ModalHeader, ModalBody  } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class ModalWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      accessDenied: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));

    /************Empty form input fileds after closing a modal window****/
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

    if (this.state.passwordConfirm) {
      this.setState({
        passwordConfirm: undefined
      });
    }

    if (this.state.wrongEmailFormat) {
      this.setState({
        wrongEmailFormat: undefined
      });
    }

    if (this.state.accessDenied) {
      this.setState({
        accessDenied: undefined
      });
    }

    if (this.state.submitted) {
      this.setState({
        submitted: undefined
      });
    }

    if (this.state.emailExists) {
      this.setState({
        emailExists: undefined
      });
    }
    /******Redirect to another route after opening a modal window******/
    if (this.props.signUp === "true") {
      if(this.state.modal===false) {
        let path = `/register`;
        this.props.history.push(path);
      }

      if (this.state.modal===true) {
        let path = `/`;
        this.props.history.push(path);
      }
    } else if (this.props.signUp === "false") {
      if (this.state.modal===false) {
        let path = `/login`;
        this.props.history.push(path);
      }

      if (this.state.modal===true) {
        let path = `/`;
        this.props.history.push(path);
      }
    }

  } //toggle


  /* Get name attribute from input fiedls and paste in into state with
  its corresponding value */
  handleChange = (event) => {
    const name = event.target.name;

    this.setState({
        [name]: event.target.value
    });

  }

  /* A function which checks format of email */
  validateEmail = (emailAddress) => {
    const mailFormat = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
    return mailFormat.test(emailAddress);
  }

  /* If data for all form fields are provided in correct format,
  submit data to backend server */
  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      submitted: true
    });

    /* Prevent data submission if entered email is in wrong format */
    let emailCheck = null;

    if (this.state.email) {
        emailCheck = this.validateEmail(this.state.email);

      if (emailCheck === false) {
        this.setState({
          wrongEmailFormat: true
        });
      } else if (emailCheck === true) {
        this.setState({
          wrongEmailFormat: false
        });
      }
    }

    /**********Registering a new user******/
   if (this.props.signUp === "true") {
     if (this.state.email && this.state.password && this.state.passwordConfirm && this.state.email.length > 0
     && this.state.password.length >= 6 && this.state.password === this.state.passwordConfirm
     && this.state.passwordConfirm.length > 0 && emailCheck === true) {

       const userInfo = {
         email: this.state.email,
         password: this.state.password
       };

       /* Send form data to Express server */
       return axios
        .post('/register', userInfo)
        .then((res) => {
          if (res.status === 201 && res.data.status !== 400) {
            this.props.history.push(`/profile`);
          }
          if (res.data.status === 400) {
             this.setState({
               emailExists: true
             });
         }
        })
        .catch(err => {
          console.error(err);
        });
      }
      /**********When a user logs in******/
    } else if (this.props.signUp === "false") {
       if (this.state.email && this.state.password && emailCheck === true) {
         const userInfo = {
           email: this.state.email,
           password: this.state.password
         };

         /* Send form data to Express server */
        return axios
          .post('/login', userInfo)
          .then((res) => {
            if (res.status === 200 && res.data.status !== 401) {
              this.props.history.push(`/profile`);
            }
             if (res.data.status === 401) {
                this.setState({
                  accessDenied: true
                });
            }
          })
          .catch(err => {
            console.error(err);
          });
     }
    }
  }

  openModalWindow() {
    this.setState({
      modal: true
    });
  }


  componentDidMount() {
    if(this.props.register) {
      this.openModalWindow();
    }

    if(this.props.login) {
      this.openModalWindow();
    }
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
                {/* If /login post request returned error 401, show warning*/}
                {this.state.accessDenied ? <small id="access" className="form-text text-danger"> Wrong email or password </small> : null }
                {/* If /login post request returned error 401, show warning*/}
                {this.state.emailExists ? <small id="uniqueEmail" className="form-text text-danger"> User with such email already exists! </small> : null }
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"  onChange={this.handleChange} />

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
                  {/* If typed email is in wrong format, show warning */}
                  {
                    this.state.wrongEmailFormat && this.state.submitted === true ?
                     <small id="emailWarning" className="form-text text-danger">Incorrect format of email</small> : null
                  }
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputPassword">Password</label>
                <input name="password" type="password" className="form-control" id="exampleInputPassword" placeholder="Password" onChange={this.handleChange}/>

                {/*If password input field is empty, show warning */}
                {
                  !this.state.password && this.state.submitted === true ?
                   <small id="passwordWarning" className="form-text text-danger">Please enter password</small> : null
                }

                {/*If password length is less than 6 symbols, show warning */}
                {
                  this.state.password && this.state.password.length < 6 && this.state.submitted === true ?
                   <small id="passwordLengthWarning" className="form-text text-danger">Password must be at least 6 symbols long</small> : null
                }
              </div>

              {/*If a button "Sign Up" is clicked, additional input field for confirming password appears */}
              {
               this.props.signUp==="true" &&
               <div className="form-group">
                 <label htmlFor="exampleConfirmPassword">Confirm password</label>
                 <input name="passwordConfirm" type="password" className="form-control" id="exampleConfirmPassword" placeholder="Confirm password" onChange={this.handleChange}/>
                 {/*If "Confirm password" input field is empty, show warning */}
                 {
                   !this.state.passwordConfirm && this.state.submitted === true ?
                    <small id="passwordWarning" className="form-text text-danger">Please enter password</small> : null
                 }

                 {/*If password in "Confirm password" field doesn't match the password, show warning */}
                 {
                   this.state.password && this.state.passwordConfirm && this.state.submitted === true && this.state.password !== this.state.passwordConfirm ?
                    <small id="passwordMatchWarning" className="form-text text-danger">Entered passwords don't match</small> : null
                 }
                </div>
              }

              <button type="submit" className="btn btn-danger" onClick={this.handleSubmit}>Submit</button>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}


export default withRouter(ModalWindow);
