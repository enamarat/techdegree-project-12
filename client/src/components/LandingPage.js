import React, { Component } from 'react';
import Photo from '../images/conversation.jpg'
import ModalWindow from './ModalWindow.js'

class LandingPage extends Component {

  render() {
    return(
      <div>
      <div className="jumbotron text-white" id="style-image">
        <div className="pt-5" id="overlay">
          <h1 className="display-4">In the Spotlight</h1>
          <p className="lead"> Get the latest data from financial markets! </p>
          {/* Modal windows*/}
          <div className="d-flex justify-content-center">
            {/* If <LandingPage/> component has a prop "register", convey it to <ModalWindow/> component.
            If a <ModalWindow/> component has this prop, modal window will be automatically opened when a user visits "/register" route*/}
            <div className="mr-2">
            {this.props.register ? <ModalWindow buttonLabel="Sign up" buttonColor="warning" signUp="true" register="true" /> : <ModalWindow buttonLabel="Sign up" buttonColor="warning" signUp="true" />}
            </div>
            {/* If <LandingPage/> component has a prop "login", convey it to <ModalWindow/> component.
            If a <ModalWindow/> component has this prop, modal window will be automatically opened when a user visits "/login" route*/}
            <div>
              {this.props.login ? <ModalWindow buttonLabel="Login" buttonColor="primary" signUp="false" login="true" /> : <ModalWindow buttonLabel="Login" buttonColor="primary" signUp="false" />}
            </div>
          </div>

        </div>
      </div>

      <div>
        <div className="row mx-auto">
          <div className="col col-12 col-md-5">
            <img src={Photo} className="img-fluid"  alt="young people having a chat" />
          </div>
          <div className="col">
            <p className="my-md-5"> Ever wondered how to get rich? Guess what, now you have a chance to be in possession of such knowledge! Get access to stock market trends, analyze foreign exchange rates and ride the lightning! </p>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default LandingPage;
