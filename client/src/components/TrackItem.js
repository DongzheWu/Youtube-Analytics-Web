import React from 'react';
import { deleteTrack, showInfo} from '../actions';
import { connect } from 'react-redux';
import '../assets/css/trackItem.css';

/** Tracking video row */
const TrackItem = props => {

  return (
    <li className="list-group-item list-group-item-action justify-content-betweenlist-group-item d-flex justify-content-between align-items-center">
      <span className="track-name" onClick={() =>{props.showInfo(props.word.keyword)}}>
        {props.word.keyword}
      </span>
      <span>
        <i className="material-icons" onClick={() => {
          props.deleteTrack(props.word._id)
        }}>delete_forever</i>
      </span>
    </li>
  );
}

export default connect(null, {deleteTrack: deleteTrack, showInfo: showInfo})(TrackItem);

