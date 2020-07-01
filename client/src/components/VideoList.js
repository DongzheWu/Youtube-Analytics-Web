import React from 'react';
import VideoItem from './VideoItem';
import { connect } from 'react-redux';

const VideoList = props =>{

        const videos = props.videos;
        const renderedList = Object.keys(videos).map((key, index) => {

        return <VideoItem key={key} video={videos[index]} />;
    });

    return <div>{renderedList}</div>;
    // return <div>List</div>;
}



  
  const mapStateToProps = (state) =>{
    return {videos: state.search};
  };
export default connect(mapStateToProps)(VideoList);