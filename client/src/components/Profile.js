import React, { Component } from 'react';
import axios from 'axios';
//import {withRouter, Redirect} from 'react-router-dom';
//import fakeAuth from './App.js'

// const AuthButton = withRouter(
//   ({ history }) =>
//     fakeAuth.isAuthenticated ? (
//       <p>
//         Welcome!{" "}
//         <button
//           onClick={() => {
//             fakeAuth.signout(() => history.push("/"));
//           }}
//         >
//           Sign out
//         </button>
//       </p>
//     ) : (
//       null
//     )
// );


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //redirectToReferrer: false
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

//class Login extends Component {
  //state = { redirectToReferrer: false };
  //
  // login = () => {
  //   fakeAuth.authenticate(() => {
  //     this.setState({ redirectToReferrer: true });
  //   });
  // };
  //
  // render() {
  //   let { from } = this.props.location.state || { from: { pathname: "/" } };
  //   let { redirectToReferrer } = this.state;
  //
  //   if (redirectToReferrer) return <Redirect to={from} />;
  //
  //   return (
  //     <div>
  //     <AuthButton />
  //       <p>You must log in to view the page at {from.pathname}</p>
  //       <button onClick={this.login}>Log in</button>
  //     </div>
  //   );
  // }
//}

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
