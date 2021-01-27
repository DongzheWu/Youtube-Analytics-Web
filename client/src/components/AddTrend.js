import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addTrend } from '../actions';
import {InputGroup, FormControl} from 'react-bootstrap';
import '../assets/css/addTrack.css';

/**
 * This component render HTML for new google trend keyword input, form validation and submit operation.
 */
const AddTrend = props =>{
  const {handleSubmit, addTrend} = props;
  return (
    <div>
      <form onSubmit={handleSubmit((values) => addTrend(values))}>
        <Field type="text" name="addTrend" component={renderInput} label="add Track" />
      </form>
    </div>
  );
}

const renderError = ({ error, touched }) => {
  if(touched && error) {
    return(
      <div>{error}</div>
    );
  }
}

/** Render input HTML */
const renderInput = ({input, meta}) => {
  return (
    <div className="track-div">
      <InputGroup  className="mb-3 track-input">
        <FormControl {...input} autoComplete="off" placeholder=" Add Keyword"/>
        <InputGroup.Append>
          <button className="track-button"><i className="fas fa-plus track-fas"></i></button>         
        </InputGroup.Append>
      </InputGroup>
      {renderError(meta)}
    </div>
  );
}

/** Check if the inpum is empty */
const validate = (formValues) => {
  const errors = {};
  if(!formValues.addTrend){
    errors.addTrend = 'You must enter a keyword';
  }
  return errors;
};

const mapStateToProps = state => {
  return state;
}

var temp = connect(
  mapStateToProps,
    {addTrend: addTrend}
)(AddTrend);

export default reduxForm({
  form: 'trackInput',
  validate: validate,
})(temp);