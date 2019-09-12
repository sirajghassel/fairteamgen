import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './Pages/Home'
import Event from './Pages/Event'

class App extends React.Component {
    render(){
      return (
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/event/:eventpin" exact component={Event} />
        </Router>
      );
    }
}

export default App;
