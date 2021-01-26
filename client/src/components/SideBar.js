import React from "react";
import { bubble as Menu } from "react-burger-menu";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SideBar extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
          menuOpen: false
        }
      }
    

      handleStateChange (state) {
        this.setState({menuOpen: state.isOpen})  
      }

      closeMenu () {
        this.setState({menuOpen: false})
      }
   
      toggleMenu () {
        this.setState(state => ({menuOpen: !state.menuOpen}))
      }
    render(){
        return (

            <Menu{...this.props} isOpen={ this.state.menuOpen }>
            <Link to={'/'} className="menu-item" onClick={() => this.closeMenu()}>
 
              <div className="sidebar-row">
              <div className="sidebar-icon">
                  <i className="fas fa-home"></i>
                </div>
                <div className="sidename-div">
                  <span className="side-item">Overview</span>
                </div>
              </div>
              
            
            </Link>
            <Link to={'/search'} className="menu-item" onClick={() => this.closeMenu()}>
             <div className="sidebar-row">
             <div className="sidebar-icon">
                <i className="fab fa-searchengin"></i>
                </div>
                <div className="sidename-div">
                <span className="side-item">Search</span>
                </div>
               </div>
            </Link>

            <Link to={'/analytics'} className="menu-item" onClick={() => this.closeMenu()}>
            <div className="sidebar-row">
            <div className="sidebar-icon">
              <i className="fas fa-chart-bar"></i>
              </div>
              <div className="sidename-div">
                <span className="side-item">Analytics</span>
                </div>
                </div>
            </Link>

        
            {/* <div className="sidebar-row">
            <div className="sidebar-icon">
                <i className="far fa-file-word side-fa"></i>
                </div>
                <div className="sidename-div">
                <span className="side-item">Keywords</span>
                </div>
                </div> */}
           

            <Link to={'/trend'} className="menu-item" onClick={() => this.closeMenu()}>
  
            <div className="sidebar-row">
            <div className="sidebar-icon">
              <i className="fas fa-chart-line side-fa"></i>
              </div>
              <div className="sidename-div">
                <span className="side-item">Trend</span>
                </div>
                </div>
            </Link>
        
            <Link to={'/map'} className="menu-item" onClick={() => this.closeMenu()}>
                <div className="sidebar-row">
                <div className="sidebar-icon">
              <i className="fa fa-globe side-fa" aria-hidden="true"></i>
              </div>
              <div className="sidename-div">
                <span className="side-item">Map</span>
                </div>
                </div>
            </Link>
        
            <Link       
                to={this.props.auth ? '/track' : '/login'}
                className="menu-item"
                onClick={() => this.closeMenu()}
            >
                <div className="sidebar-row">
              <div className="sidebar-icon">
              <i className="fas fa-file-contract"></i>
              </div>
              <div className="sidename-div">
                <span className="side-item">Track</span>
                </div>
                </div>
            </Link>
            </Menu>
          );
    }

};


function mapStateToProps({ auth }) {
    return { auth };
  }
  
export default connect(mapStateToProps)(SideBar);