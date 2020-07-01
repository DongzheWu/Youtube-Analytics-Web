import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Trendboard from './Trendboard';
import Mapboard from './Mapboard';
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    
    return (

        <BrowserRouter>

            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/track" component={Dashboard} />
            <Route exact path="/trend" component={Trendboard} />
            <Route exact path="/map" component={Mapboard} />

            

        </BrowserRouter>

    );
  }
}

export default connect(null, actions)(App);