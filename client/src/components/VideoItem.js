import React from 'react';
import './VideoItem.css';
import KeywordList from './KeywordList';


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



    render () {
        console.log(this.props);
        const video = this.props.video.items[0];
        return(
            <div>
            <div onClick={() => this.onVideoSelect()} className="video-item item" >
            <img alt={video.snippet.title} className="ui image" src={video.snippet.thumbnails.medium.url} />
            <div className="info content">
                <div className="header">视频名字 videoTitle : { video.snippet.title }</div>
                <div className="content">频道名称 channelTitle :{ video.snippet.channelTitle }</div>
                <div className="content">关键词 keywords： <KeywordList keywords = { video.snippet.tags}/></div>
                <div className="content">观看量 viewCount：{video.statistics.viewCount }</div>
                <div className="content">点赞 likeCount： { video.statistics.likeCount }</div>
                <div className="content">评论 commentCount： { video.statistics.commentCount }</div>
                <div className="content">不喜欢 dislikeCount： { video.statistics.dislikeCount }</div>
                <div className="content">发布时间 publishedAt： { video.snippet.publishedAt }</div>
            </div>
            </div>
            <div className="content"> { this.state.display && "描述 description :" + video.snippet.description }</div>   
            </div>  
        );
  
    }
}

export default VideoItem;