import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';


class ModalWindowSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
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
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>

              {
                this.props.signUp==="true" &&  
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                }

              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
              </div>

              <button type="submit" className="btn btn-danger" id="signup">Submit</button>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ModalWindowSignUp;
