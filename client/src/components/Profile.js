import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
//import {withRouter, Redirect} from 'react-router-dom';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.getData = this.getData.bind(this);
  }

getData() {
  /*Get data from Express server */
  axios
   .get('/profile')
   .then((response) => console.log(response))
   .catch(err => {
     console.error(err);
   });
}

componentDidMount() {
  this.getData();
}


leaveProfilePage = () => {
  this.props.logout();
  this.props.history.push(`/`);
}


  render() {
    return(
      <div>
      
        <div className="d-flex justify-content-center">
          <h2> Trending hashtags on Twitter </h2>
          <button className="btn btn-info" onClick={this.leaveProfilePage}> Log out </button>
        </div>
      </div>
    );
  }
}


export default withRouter(Profile);
