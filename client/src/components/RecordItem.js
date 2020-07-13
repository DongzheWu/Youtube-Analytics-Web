import React from 'react';
// import { deleteTrack, showInfo} from '../actions';
// import { connect } from 'react-redux';
import '../assets/css/RecordItem.css';
import { chartData } from '../actions';
import { connect } from 'react-redux';
const modifyTime = time => {
    var parts = time.split("T");
    return parts[0];
}

const getAverage = values => {

    if(values.length > 0){
        var sum = values.reduce((previous, current) => current += previous);
        
        var avg = sum / values.length;
        console.log(avg);
        return avg.toFixed(2);
    }else{
        return "ToBeUpdated";
    }
    
}

const RecordItem = props => {
    
    const {video} = props;
    console.log(video);

  
    return (
        <li onClick={() =>{
            if(video.values){
                props.chartData(video.values, video.redates)
            }}
                } className="record-item list-group-item list-group-item-action justify-content-betweenlist-group-item d-flex">
            <div>
                <div className="row record-title" style={{overflow: "hidden"}}>
                    {video.videoTitle}
                </div>
                <div className="row attributes">
                    <span className="record-span"><i class="far fa-clock"><span id="hover-element-time">Publish Time</span></i> {modifyTime(video.videoPubTime)}</span>
                    
                    <span className="record-span"><i class="fas fa-calculator"><span id="hover-element-count">ViewCount</span></i><span className="view-count">{ video.recentViewCount }</span></span>
                    <span className="record-span"><i class="fas fa-chart-line"><span id="hover-element-increase">Average Increase Count</span></i><span className="increase-number">{ getAverage(video.values) }</span></span>
                    <span className="record-span"><a href={'https://www.youtube.com/watch?v=' + video.videoId} class="active">Link</a></span>
                    
                </div>

            </div>

        </li>
    );
}

export default connect(null, {chartData: chartData})(RecordItem);