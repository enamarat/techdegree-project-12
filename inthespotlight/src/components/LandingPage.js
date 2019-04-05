import React, { Component } from 'react';
import Background from '../images/people.jpg'
import Photo from '../images/conversation.jpg'
import ModalWindow from './ModalWindow.js'



/**********Styles**********************/
const styleBackgroundImage = {
  backgroundSize: 'cover',
  backgroundImage: `url(${Background})`,
  height: '45vh',
  backgroundColor: 'rgba(255, 0, 0, 0.5)'
};

const overlay = {
  position: 'absolute',
  backgroundColor: 'rgba(255, 0, 0, 0.5)',
  top:'0',
  left:'0',
  right:'0',
  bottom:'55vh',
  zIndex:'0'
};
/******************************************/

class LandingPage extends Component {

  render() {
    return(
      <div>
      <div className="jumbotron text-white" style={styleBackgroundImage}>
        <div className="pt-5" style={overlay}>
          <h1 className="display-4">In the Spotlight</h1>
          <p className="lead">an app which provides you with gifs for trending hashtags on <a href="https://twitter.com/" className="font-weight-bold text-warning"> Twitter </a></p>
          {/* Modal windows*/}
          <div className="d-flex justify-content-center">
            <div className="mr-2">
            <ModalWindow buttonLabel="Sign up" buttonColor="warning" signUp="true"/>
            </div>
            <div>
            <ModalWindow buttonLabel="Login" buttonColor="primary" signUp="false"/>
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
