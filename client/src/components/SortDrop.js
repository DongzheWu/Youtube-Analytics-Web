import React from 'react';
import {DropdownButton, Dropdown} from 'react-bootstrap';
import { connect } from 'react-redux';
import { timeSort, viewCountSort } from '../actions';
class SortDrop extends React.Component{


    

    render(){
        if(this.props.display === false) return <div></div>
        return (

            <DropdownButton id="dropdown-basic-button" title="Sort Button">
            <Dropdown.Item onClick={() => this.props.timeSort(this.props.videos)}>Publish Time Sort</Dropdown.Item>
            <Dropdown.Item onClick={() => this.props.viewCountSort(this.props.videos)}>View Count Sort</Dropdown.Item>
            </DropdownButton>
            );
    }
}


function mapStateToProps(state) {

    return {
      videos: state.info
    };
  }
  
  export default connect(mapStateToProps, {timeSort: timeSort, viewCountSort: viewCountSort})(SortDrop);

