import React, { Component } from 'react';
import { HashRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Trendboard from './Trendboard';
import Mapboard from './Mapboard';
import Loginboard from './Loginboard';
import Analyticsboard from './Analyticsboard';
import Keywordsboard from './Keywordsboard';
import '../assets/css/SideBar.css';
import Overviewboard from './Overviewboard';
import history from '../history';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    
    return (
      <div id="App">

      <div id="outer-container">
        <HashRouter history={history}>
            <Header />
            <div id="page-wrap">

            <Route exact path="/" component={Overviewboard} />
            <Route exact path="/search" component={Landing} />
            <Route exact path="/analytics" component={Analyticsboard} />
            <Route exact path="/keywords" component={Keywordsboard} />
            <Route exact path="/trend" component={Trendboard} />
            <Route exact path="/map" component={Mapboard} />
            <Route exact path="/track" component={Dashboard} />
            <Route exact path="/login" component={Loginboard} />
            
            </div>
            

        </HashRouter>
        </div>
        </div>

   
    );
  }
}

export default connect(null, actions)(App);