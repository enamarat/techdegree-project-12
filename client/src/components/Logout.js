import React, { Component } from 'react';
import axios from 'axios';


class Logout extends Component {

 getResponse() {
  return axios
   .get('/logout')
   .then((response) => {
     console.log(response)

   })
   .catch(err => {
     console.error(err)
   });
}

componentDidMount() {
  this.getResponse()
}

render () {
  return(
    <div id="not-found">
          <h3> Congratulations! </h3>
          <p> You are successfully logged out.</p>

    </div>
    );
  }
}


export default Logout;
