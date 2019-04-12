import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {NavLink} from 'react-router-dom';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.getData = this.getData.bind(this);
  }

  /*Get data from Express server */
  getData() {
    return axios
     .get('/profile')
     .then((response) => {

       if(response.data.email) {
         this.setState({ user: response.data.email});
       }

       if(response.data.status === 403) {
         this.props.history.push(`/login`);
       }
     })
     .catch(err => {
       console.error(err);
     });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return(
      <div>
        <div className="d-flex justify-content-end mt-3 mr-3">
          <p className="mr-2"> You are signed in as <span id="user">{this.state.user}</span> </p>
          <NavLink to="/logout"><button className="btn btn-danger">  Log out  </button></NavLink>
        </div>
          <h2> Trending hashtags on Facebook </h2>
      </div>
    );
  }
}


export default withRouter(Profile);
