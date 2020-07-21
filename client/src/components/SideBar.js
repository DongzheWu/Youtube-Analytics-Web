import React from "react";
import { bubble as Menu, bubble } from "react-burger-menu";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Row, Col} from 'react-bootstrap';

class SideBar extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
          menuOpen: false
        }
      }
    
      // This keeps your state in sync with the opening/closing of the menu
      // via the default means, e.g. clicking the X, pressing the ESC key etc.
      handleStateChange (state) {
        this.setState({menuOpen: state.isOpen})  
      }
      
      // This can be used to close the menu, e.g. when a user clicks a menu item
      closeMenu () {
        this.setState({menuOpen: false})
      }
    
      // This can be used to toggle the menu, e.g. when using a custom icon
      // Tip: You probably want to hide either/both default icons if using a custom icon
      // See https://github.com/negomi/react-burger-menu#custom-icons
      toggleMenu () {
        this.setState(state => ({menuOpen: !state.menuOpen}))
      }
    render(){
        return (
            // Pass on our propsonClick = {(e) => this.dropdownClick(e.target.textContent)}
            <Menu{...this.props} isOpen={ this.state.menuOpen }>
            <Link to={'/'} className="menu-item" onClick={() => this.closeMenu()}>
              <Row>
                <Col md={4}>
                  <i class="fas fa-home"></i>
                </Col>
                <Col md={8}>
                  <span className="side-item">Overview</span>
                </Col>
              </Row>
              
            
            </Link>
            <Link to={'/search'} className="menu-item" onClick={() => this.closeMenu()}>
             <Row>
              <Col md={4}>
                <i class="fab fa-searchengin"></i>
                </Col>
                <Col md={8}>
                <span className="side-item">Search</span>
                </Col>
                </Row>
            </Link>

            <Link to={'/analytics'} className="menu-item" onClick={() => this.closeMenu()}>
            <Row>
              <Col md={4}>
              <i className="fas fa-chart-bar"></i>
                </Col>
                <Col md={8}>
                <span className="side-item">Analytics</span>
                </Col>
                </Row>
            </Link>

            <Link to={'/analytics'} className="menu-item" onClick={() => this.closeMenu()}>
            <Row>
              <Col md={4}>
                <i class="far fa-file-word side-fa"></i>
                </Col>
                <Col md={8}>
                <span className="side-item">Keywords</span>
                </Col>
                </Row>
            </Link>

            <Link to={'/trend'} className="menu-item" onClick={() => this.closeMenu()}>
  
                <Row>
              <Col md={4}>
              <i class="fas fa-chart-line side-fa"></i>
                </Col>
                <Col md={8}>
                <span className="side-item">Trend</span>
                </Col>
                </Row>
            </Link>
        
            <Link to={'/map'} className="menu-item" onClick={() => this.closeMenu()}>
                <Row>
              <Col md={4}>
              <i className="fa fa-globe side-fa" aria-hidden="true"></i>
                </Col>
                <Col md={8}>
                <span className="side-item">Map</span>
                </Col>
                </Row>
            </Link>
        
            <Link       
                to={this.props.auth ? '/track' : '/login'}
                className="menu-item"
                onClick={() => this.closeMenu()}
            >
                <Row>
              <Col md={4}>
              <i className="fas fa-file-contract"></i>
                </Col>
                <Col md={8}>
                <span className="side-item">Track</span>
                </Col>
                </Row>
            </Link>
            </Menu>
          );
    }

};


function mapStateToProps({ auth }) {
    return { auth };
  }
  
export default connect(mapStateToProps)(SideBar);