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
        <div className="d-flex justify-content-center">
          <h2> Trending hashtags on Twitter </h2>
          <NavLink to="/logout"><button className="btn btn-info">  Log out  </button></NavLink>
        </div>
      </div>
    );
  }
}


export default withRouter(Profile);
