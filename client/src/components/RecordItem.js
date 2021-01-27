import React from 'react';
import '../assets/css/recordItem.css';
import { chartData } from '../actions';
import { connect } from 'react-redux';

/** Split timestamp, remove second part. */
const modifyTime = time => {
    var parts = time.split("T");
    return parts[0];
}

/** Calculate average view count increased. */
const getAverage = values => {
  if(values.length > 0){
    var sum = values.reduce((previous, current) => current += previous);
    var avg = sum / values.length;
    return avg.toFixed(2);
  }else{
    return "ToBeUpdated";
  }
}

/** Display publish time, view count and average increase view count of the tracking video. */
const RecordItem = props => {
  const {video} = props;
  return (
    <li className="record-li record-item list-group-item list-group-item-action justify-content-between d-flex">
      <div>
        <div className="row record-title" style={{overflow: "hidden"}} onClick={() =>{
          if(video.values){
            props.chartData(video.values, video.redates)
        }}}>
          {video.videoTitle}
          <span id="hover-element-title">Show char by click</span>
        </div>
        <div className="row attributes">
          <span className="record-span"><i className="far fa-clock"><span id="hover-element-time">Publish Time</span></i> {modifyTime(video.videoPubTime)}</span>   
          <span className="record-span"><i className="fas fa-calculator"><span id="hover-element-count">ViewCount</span></i><span className="view-count">{ video.recentViewCount }</span></span>
          <span className="record-span"><i className="fas fa-chart-line"><span id="hover-element-increase">Average Increase Count</span></i><span className="increase-number">{ getAverage(video.values) }</span></span>
          <span className="record-span"><a href={'https://www.youtube.com/watch?v=' + video.videoId} className="active">Link</a></span>    
        </div>
      </div>
    </li>
  );
}

export default connect(null, {chartData: chartData})(RecordItem);