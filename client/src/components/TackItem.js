import React from 'react';
import { deleteTrack, showInfo} from '../actions';
import { connect } from 'react-redux';
import '../assets/css/TrackItem.css';

const TrackItem = props => {
  
    return (
        
        <li onClick={() =>{props.showInfo(props.word.keyword)}} className="list-group-item list-group-item-action justify-content-betweenlist-group-item d-flex justify-content-between align-items-center">
            {props.word.keyword}
            <span>
            <i class="material-icons" onClick={() => {
                props.deleteTrack(props.word._id)
            }}>delete_forever</i>
            </span>
            </li>
    );
}


export default connect(null, {deleteTrack: deleteTrack, showInfo: showInfo})(TrackItem);

