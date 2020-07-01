import React from 'react';
import { connect } from 'react-redux';
import '../assets/css/TrendItem.css';
import { deleteTrend } from '../actions';
import { Form } from 'react-bootstrap';

const TrendItem = props => {
    console.log("item");
  
    return (
        <div>
        <span>{props.trend}</span>
        
        <label>
          <input
          className="check-box"
          value={props.trend}
            type="checkbox"
          />
        </label>
        <i class="fas fa-times" onClick={() =>{props.deleteTrend(props.trend)}}></i>
      </div>
    );
}

export default connect(null, {deleteTrend: deleteTrend})(TrendItem);
