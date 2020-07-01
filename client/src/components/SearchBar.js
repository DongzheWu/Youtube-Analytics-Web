import React from 'react';
import SearchInput from './SearchInput';

class SearchBar extends React.Component{
    
    // onSubmit = (form) => {
    //     console.log("ze")
    //     console.log(form);
    //     searchKeyword(form);
    // }

    render(){
        return <SearchInput/>;
    }
}
// const mapStateToProps = form =>{
//     return {form};
//   };

// export default connect(mapStateToProps, searchKeyword)(SearchBar);
export default SearchBar;