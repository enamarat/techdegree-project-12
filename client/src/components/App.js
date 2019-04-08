import React, { Component } from 'react';
import LandingPage from './LandingPage.js'
import {BrowserRouter, Route, Switch} from 'react-router-dom';


class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }
  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);
  //   return body;
  // };

  handleInputChange = (data) => {
    this.setState({ post: data });
  //  console.log(this.state);
  }


  // handleSubmit = () => {
  //   //e.preventDefault();
  //   fetch('http://localhost:5000/register', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(this.state),
  //   })
  //   .then((response) => response.json())
  // //  .then((data) => console.log(data));
  //
  // };


  // handleSubmit = async e => {
  //   //e.preventDefault();
  //   const response = await fetch('/register', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ post: this.state.post }),
  //   });
  //   const body = await response.text();
  //   this.setState({ responseToPost: body });
  // };


  render() {
    return (
      //<div className="App">
      // <p>{this.state.response}</p>
      //        <form onSubmit={this.handleSubmit}>
      //          <p>
      //            <strong>Post to Server:</strong>
      //          </p>
      //          <input
      //            type="text"
      //            value={this.state.post}
      //            onChange={e => this.setState({ post: e.target.value })}
      //          />
      //          <button type="submit">Submit</button>
      //        </form>
      //        <p>{this.state.responseToPost}</p>
      //   </div>

      <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/"  render={() => <LandingPage />} />
          <Route path="/register" render={() => <LandingPage inputChange={this.handleInputChange} handleSentData={this.handleSubmit}/>} />
        {/*  <Route path="/login" component={LandingPage}/> */}
          <Route path="/profile" />
        </Switch>
    {/*     <p className="returned">{this.state.responseToPost}</p> */}
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
