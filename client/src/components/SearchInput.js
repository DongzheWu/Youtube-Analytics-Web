import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { searchKeyword } from '../actions';
import {InputGroup, FormControl} from 'react-bootstrap';
import '../assets/css/searchbar.css';
import { useSpring, animated } from 'react-spring';
import history from '../history';

const renderError = ({ error, touched }) => {
    if(touched && error) {
        return(
            <div>{error}</div>
        );
    }
}

const renderInput = ({input, label, meta}) => {

    return (
        <div>
            <InputGroup className="mb-3" {...input} autoComplete="off">
            <FormControl
                className="form-control"
                {...input} autoComplete="off"
                placeholder=" Search Youtube Keyword"
          
                />
         
            <InputGroup.Append>
            <button className="search-button"><span className="fa fa-search fa-2x" aria-hidden="true"></span></button>
                
            </InputGroup.Append>


            </InputGroup>
            {renderError(meta)}

        </div>

    );
}


const SearchInput = props =>{
    const [isClicked, setClicked] = useState(false);

    const initFade = useSpring({
        from: {
            marginTop: '30%'
        },
        marginTop: isClicked ? '3%' : '10%'
    });

    const {handleSubmit, searchKeyword, auth} = props
    const SubmitFunctions = async(values) =>{
        if(!auth){
            history.push('./login')
        }else{
            await searchKeyword(values);
            setClicked(true);
        }

        
    }
       
    return (
    
            <animated.form className="search-form" style={initFade} onSubmit={
                handleSubmit((values) => SubmitFunctions(values))}>
                    
                <Field type="text" name="searchKeyword" component={renderInput} label="Video Search" />
                
            </animated.form>
    );
}



const validate = (formValues) => {
    const errors = {};
    if(!formValues.searchKeyword){
        errors.searchKeyword = 'You must enter a keyword';
    }
    return errors;
};
const mapStateToProps = state => {
    return state;
}


var temp = connect(
    mapStateToProps,
    {
        searchKeyword: searchKeyword,
        
    }
)(SearchInput)

export default reduxForm({
    form: 'searchBar',
    validate: validate
})(temp);

  