import React from 'react';
import { connect } from 'react-redux';
import '../assets/css/TrendItem.css';
import { deleteTrend } from '../actions';

const TrendItem = props => {
  
    return (
        <div>
        <label>
          <input
          className="check-box"
          value={props.trend}
            type="checkbox"
          />
        </label>
        <span>{props.trend}</span>
        

        <i className="fas fa-times" onClick={() =>{props.deleteTrend(props.trend)}}></i>
      </div>
    );
}

export default connect(null, {deleteTrend: deleteTrend})(TrendItem);
