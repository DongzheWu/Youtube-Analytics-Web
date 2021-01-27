import React from 'react';
import '../assets/css/videoItem.css';
import KeywordList from './KeywordList';
import {Row, Col, Image} from 'react-bootstrap';

/** VideoITem contains basic information of searched single video.*/
class VideoItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {display: false,};
  }

  //Set toggle to display description of the clicked video.
  onVideoSelect(){
    this.setState((currentState) =>({
      display: !currentState.display,
    }));  
  }

  //Render description once the item is clicked.
  renderDisplay = (display, video) =>{
    if(display){
      return <span><span className="video-span">Description:</span><span>{video.description}</span></span>;
    }else{
      return <span></span>;
    }
  }

  render () {
    const video = this.props.video;
    return(
      <div>
        <Row className="video-item item">
          <Col md={12} lg={3}>
            <Image onClick={() => this.onVideoSelect()} alt={video.title} src={video.thumbnails} className="center-block" thumbnail />
          </Col>
          <Col md={12} lg={9}> 
            <div className="video-info">
              <span className="video-span">VideoTitle:</span><span className="video-span-right">{ video.title }</span>
              <span className="video-span">ChannelTitle:</span><span className="video-span-right">{ video.channelTitle }</span>
            </div>
            <div className="video-keyword"><span className="video-span">Tags：</span><KeywordList keywords = { video.tags}/></div>
            <div className="video-info">
              <span className="video-span">ViewCount:</span><span className="video-span-right">{video.viewCount }</span>
              <span className="video-span">LikeCount:</span><span className="video-span-right">{ video.likeCount }</span>
              <span className="video-span">CommentCount:</span><span className="video-span-right">{ video.commentCount }</span>
              <span className="video-span">DislikeCount:</span><span className="video-span-right">{ video.dislikeCount }</span>
              <span className="video-span">PublishedTime:</span><span className="video-span-right">{ video.publishedAt }</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="descrip"> {this.renderDisplay(this.state.display, video)}</div>  
          </Col>
        </Row> 
      </div>  
    );
  }
}

export default VideoItem;