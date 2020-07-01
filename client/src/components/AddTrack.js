import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addTrack } from '../actions';
import {InputGroup, FormControl} from 'react-bootstrap';
import '../assets/css/AddTrack.css';

const renderError = ({ error, touched }) => {
    if(touched && error) {
        return(
            <div>{error}</div>
        );
    }
}
const renderInput = ({input, label, meta}) => {

    return (
        <div className="track-div">
   
            <InputGroup  className="mb-3 track-input">
            <FormControl {...input} autoComplete="off" placeholder=" Add Keyword"/>
            <InputGroup.Append>
                <button className="track-button"><i class="fas fa-plus track-fas"></i></button>
                    
            </InputGroup.Append>
            </InputGroup>

        {renderError(meta)}
        </div>

    );
}


const trackInput = props =>{
    const {handleSubmit, addTrack} = props
       
    return (
        <div>
            <form onSubmit={handleSubmit((values) => addTrack(values))}>
                    
                <Field type="text" name="addTrack" component={renderInput} label="add Track" />
            </form>
        </div>
    );
}




const validate = (formValues) => {
    const errors = {};
    if(!formValues.addTrack){
        errors.addTrack = 'You must enter a keyword';
    }
    return errors;
};
const mapStateToProps = state => {
    return state;
}

var temp = connect(
    mapStateToProps,
    {addTrack: addTrack}
)(trackInput);

export default reduxForm({
    form: 'trackInput',
    validate: validate,

})(temp);