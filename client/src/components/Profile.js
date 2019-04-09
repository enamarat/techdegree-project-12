import React, { Component } from 'react';
import axios from 'axios';

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


  render() {
    return(
      <div>
        <div className="d-flex justify-content-center">
          <h2> Trending hashtags on Twitter </h2>
        </div>
      </div>
    );
  }
}


export default Profile;
