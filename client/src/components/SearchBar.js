import React from 'react';
import SearchInput from './SearchInput';
import { connect } from 'react-redux';
class SearchBar extends React.Component{
    

    render(){
        return <SearchInput/>;
    }
}
const mapStateToProps = state =>{
    return {search: state.search};
  };

export default connect(mapStateToProps)(SearchBar);


