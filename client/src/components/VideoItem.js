import React from 'react';
import './VideoItem.css';
import KeywordList from './KeywordList';
import {Row, Col, Image} from 'react-bootstrap';


class VideoItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {display: false,};
    }


    onVideoSelect(){
        
        this.setState((currentState) =>(
            {
                display: !currentState.display,
            }
        ));
        
    };

    renderDisplay = (display, video) =>{
        if(display){
            return <span><span className="video-span">Description:</span><span>{video.snippet.description}</span></span>;
        }else{
            return <span></span>;
        }
    }



    render () {
        console.log(this.props);
        const video = this.props.video.items[0];
        return(
            <div>
            <Row className="video-item item">

            {/* <div className="video-item item" > */}
            <Col md={12} lg={3}>
            

            <Image onClick={() => this.onVideoSelect()} alt={video.snippet.title} src={video.snippet.thumbnails.medium.url} className="center-block" thumbnail />
            </Col>
            <Col md={12} lg={9}> 
            {/* <div className="info content"> */}
                <div className="video-info">
                <span className="video-span">VideoTitle:</span><span className="video-span-right">{ video.snippet.title }</span>
                <span className="video-span">ChannelTitle:</span><span className="video-span-right">{ video.snippet.channelTitle }</span>
                </div>

          
                <div className="video-keyword"><span className="video-span">Keywords：</span><KeywordList keywords = { video.snippet.tags}/></div>
                <div className="video-info">
                <span className="video-span">ViewCount:</span><span className="video-span-right">{video.statistics.viewCount }</span>
                <span className="video-span">LikeCount:</span><span className="video-span-right">{ video.statistics.likeCount }</span>
                <span className="video-span">CommentCount:</span><span className="video-span-right">{ video.statistics.commentCount }</span>
                <span className="video-span">DislikeCount:</span><span className="video-span-right">{ video.statistics.dislikeCount }</span>
               <span className="video-span">PublishedTime:</span><span className="video-span-right">{ video.snippet.publishedAt }</span>
                {/* </div> */}

            </div>
            </Col>
            </Row>
            {/* </div> */}
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