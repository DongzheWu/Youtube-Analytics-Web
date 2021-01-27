import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Navbar } from 'react-bootstrap';
import '../assets/css/main.css';
import '../assets/css/styles.css';
import '../assets/css/header.css';
import '../assets/plugins/jqvmap/jqvmap.min.css'
import SideBar from "./SideBar"

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      //If there is no user login information is received
      case null:
        return;
      //If user not log in yet, display login button.
      case false:
        return <ui className="login-ui">
                  <a href="/auth/google" className="login-google">
                  <i className="fab fa-google">
                  </i>Login With Google</a>
                </ui>;
      default:
        //Return user profile mmanu toggle
        return (
          <Dropdown className="user-item nav-item user-nav">
            <Dropdown.Toggle className="user-link nav-link d-inline-flex align-items-center h-100 small-1 pl-1 pl-sm-3 pr-0">
              <div className="d-none d-sm-block user-text">
                <div className="lh-5">{this.props.auth.email}</div>
                  <span className="small-3"><i className="fas fa-circle text-warning small-5"></i> Online</span>
                </div>                
            </Dropdown.Toggle>

            <Dropdown.Menu className="shadow-1 py-3 position-absolute user-manu" aria-labelledby="dropdownAdmin">
              <Dropdown.Item herf="#"><span className="icon-messenger-user-avatar mr-2"></span>My Profile</Dropdown.Item>
              <Dropdown.Item herf="#"><span className="icon-closed-envelope-email mr-2"></span>Messages</Dropdown.Item>
              <Dropdown.Item herf="#"><span className="icon-options-gear mr-2"></span>Settings</Dropdown.Item>
              <Dropdown.Item href="/api/logout"><a href="/api/logout"><span className="icon-power-on-buton mr-2"></span>Logout</a></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
    }
  }

  render() {
    return (
      <header className="main-header">
        <SideBar pageWrapId={"page-wrap"} id={"reveal"} outerContainerId={"App"} />
        <Navbar className="header-navbar">
            <div className="header-name">YouTube Analytics</div>
            <div>
              {this.renderContent()}
            </div>
        </Navbar>
      </header>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);