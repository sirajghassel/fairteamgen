import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './Pages/Home'
import Event from './Pages/Event'

class App extends React.Component {
    render(){
      return (
        <React.Fragment>
          <div className="tape">
            <p className="message">THIS IS A PROOF OF CONCEPT</p>
          </div>
          <div className="navbar-fixed">
            <nav>
              <div className="nav-wrapper">
                <a href="/" className="brand-logo">Fair Team Gen</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><a href={window.location.origin + "/"}>Create Event</a></li>
                  <li><a href="https://github.com/sirajghassel/fairteamgen" target="_BLANK" rel="noopener noreferrer" ><i className="fa fa-github"></i></a></li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="app container">
            <Router>
              <Route path="/" exact component={Home} />
              <Route path="/event/:eventpin" exact component={Event} />
            </Router>
          </div>  
          <div className="footer">
            <p className="message">
              <span>Developed by Abdul Amoud, Siraj Ghassel and Majed Jarrar. </span>
              <span className="sponsor">Sponsored by <a href="https://adaptco.ca" target="_BLANK" rel="noopener noreferrer">Adaptco</a></span>
            </p>
          </div>
        </React.Fragment>
      );
    }
}

export default App;
