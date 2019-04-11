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
          <p className="lead">an app which provides you with gifs for trending hashtags on <a href="https://twitter.com/" className="font-weight-bold text-warning"> Twitter </a></p>
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
            <p className="my-md-5"> Ever wondered what's on everybody's mind today? Guess what? Now you can be in possesion of such knowledge and demonstrate it to others with cool gifs! So nobody will argue that you are not aware of the hottest trends on the social media! </p>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default LandingPage;
