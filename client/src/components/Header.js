import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Nav, Row, Col } from 'react-bootstrap';
import { Dropdown, Navbar } from 'react-bootstrap';
import '../assets/css/main.css';
import '../assets/css/styles.css';
import '../assets/plugins/jqvmap/jqvmap.min.css'
import SideBar from "./SideBar"

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
          case null:
            return;
          case false:
            return <ui style={{float: 'right', marginTop:'1.75em'}}><a href="/auth/google" className="login-google"><i className="fab fa-google"style={{marginRight: '1em'}}></i>Login With Google</a></ui>;
          default:

            return (
              <Dropdown className="user-item nav-item" style={{height: '57.8px', float: 'right', marginTop:'1.3em'}}>
              <Dropdown.Toggle className="user-link nav-link d-inline-flex align-items-center h-100 small-1 pl-1 pl-sm-3 pr-0">
              {/* <img class="user-avatar rounded-circle mr-sm-3" src="./assets/img/avatar/1.jpg" alt="Avatar" /> */}
                <div className="d-none d-sm-block lh-1">
                  <div className="lh-5">{this.props.auth.email}</div>
                  <span className="small-3"><i className="fas fa-circle text-warning small-5"></i> Online</span>
                </div>                
              </Dropdown.Toggle>
            
  
            <Dropdown.Menu className="shadow-1 py-3 position-absolute mt-2" aria-labelledby="dropdownAdmin">
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
        <Navbar>
        
          <Row>
          <Col lg={6}>
            <div style={{marginLeft: '4em', marginTop:'1em', fontSize: '1.3rem', fontWeight: '600', fontFamily: 'Open Sans,sans-serif'}}>YouTube Analytics</div>
          </Col>
          <Col lg={6}>
            {this.renderContent()}
          </Col>
          </Row>

        </Navbar>

        {/* <Navbar expand="lg" className="main-navbar navbar navbar-expand-lg navbar-light shadow-2"> */}

        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{backgroundColor: 'rgba(1, 23, 46, 0.997)'}}> */}
        {/* <Nav className="mr-auto" >
        <SideBar pageWrapId={"page-wrap"} id={"reveal"} outerContainerId={"App"} /> */}
        {/* <Link to={'/'} className="nav-link">
          Home
          </Link>
          <Link       
              to={this.props.auth ? '/track' : '/login'}
              className="nav-link"
            >
              Track
            </Link>
          <Link to={'/trend'} className="nav-link">
          Trend
          </Link>

          <Link to={'/map'} className="nav-link">
          Map
          </Link>

          <Link to={'/analytics'} className="nav-link">
          Analytics
          </Link> */}


    
 
      {/* </Nav> */}

      
      {/* <div style={{ marginRight: '10px'}}>
         {this.renderContent()}
      </div> */}
      {/* </Navbar.Collapse> */}
      {/* </Navbar> */}
      


      </header>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth};
}

export default connect(mapStateToProps)(Header);