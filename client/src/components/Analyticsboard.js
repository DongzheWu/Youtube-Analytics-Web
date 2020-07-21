import React, { useState } from "react";
import {Col, Row, Container, ProgressBar} from "react-bootstrap";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import { connect } from 'react-redux';
import '../assets/css/Analyticsboard.css';
import SearchInputTwo from './SearchInputTwo';


class Analyticsboard extends React.Component{

    constructor(props){
        super(props);

    }
    renderPieChart = () => {
      var videos = this.props.videos;
      console.log(new Date().getFullYear());
      var cur = new Date().getFullYear();
      var one = 0;
      var two = 0;
      var three = 0;
      var four = 0;
      var five = 0;
      var others = 0;
      if(this.props.videos.length > 0){
        for(var i = 0; i < videos.length; i++){
          
          var year = videos[i].publishedAt.split("-")[0];
          console.log(year);
          if(year == cur){
            one++;
          }else if(year == cur - 1){
            two++;
          }else if(year == cur - 2){
            three++;
          }else if(year == cur - 3){
            four++;
          }else if(year == cur - 4){
            five++;
          }else{
            others++;
          }
        }
        var chartData = {
          labels: [cur, cur - 1, cur - 2, cur - 3, cur - 4, "Others"],
          datasets: {
              label: "Published Year",
              backgroundColor: ["#24C9F6", "#2af270","#f7f794","#f74545","#f745e5", '#9b34eb'],
              data: [one,two,three,four,five,others]
            }
        }
        return <PieChart chartData={chartData}/>
      }
      return <PieChart />;

    }

    durationToSeconds = (duration) => {
      var hours   = 0;
      var minutes = 0;
      var seconds = 0;
    
      // Remove PT from string ref: https://developers.google.com/youtube/v3/docs/videos#contentDetails.duration
      duration = duration.replace('PT','');
    
      // If the string contains hours parse it and remove it from our duration string
      if (duration.indexOf('H') > -1) {
        var hours_split = duration.split('H');
        hours       = parseInt(hours_split[0]);
        duration    = hours_split[1];
      }
    
      // If the string contains minutes parse it and remove it from our duration string
      if (duration.indexOf('M') > -1) {
        var minutes_split = duration.split('M');
        minutes       = parseInt(minutes_split[0]);
        duration      = minutes_split[1];
      }
    
      // If the string contains seconds parse it and remove it from our duration string
      if (duration.indexOf('S') > -1) {
        var seconds_split = duration.split('S');
        seconds       = parseInt(seconds_split[0]);
      }
    
      // Math the values to return seconds
      return (hours * 60 * 60) + (minutes * 60) + seconds;
    }

    renderOverview = () => {
      var averageView = 0;
      var maxView = 0;
      var maxComment = 0;
      var maxDuration = 0;
      var sumComment = 0;
      var sumDuration = 0;
      var sumView = 0;
      // <span className="video-span">ViewCount:</span><span className="video-span-right">{video.viewCount }</span>
      // <span className="video-span">LikeCount:</span><span className="video-span-right">{ video.likeCount }</span>
      // <span className="video-span">CommentCount:</span><span className="video-span-right">{ video.commentCount }</span>
      if(this.props.videos.length > 0){
        var videos = this.props.videos;
        var reptms = "/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/";
        var hours = 0, minutes = 0, seconds = 0, totalseconds;
        for(var i = 0; i < videos.length; i++){
          sumView += parseInt(videos[i].viewCount, 10)
          maxView = Math.max(maxView, parseInt(videos[i].viewCount, 10));
          maxComment = Math.max(maxComment, parseInt(videos[i].commentCount, 10));
          sumComment += parseInt(videos[i].commentCount, 10); 
          sumDuration += this.durationToSeconds(videos[i].duration);
          maxDuration = Math.max(maxDuration, this.durationToSeconds(videos[i].duration));
          
    



        }
        var averageView = Math.round(sumView / videos.length);
        var averageComment = Math.round(sumComment / videos.length);
        // var averageDuration = sumDuration / videos.length;
        console.log(averageView);
        console.log(maxView);
        console.log(averageComment);
        var averageDuration = Math.round(sumDuration / videos.length);
        hours = Math.round(averageDuration / 3600);
        minutes = Math.round((averageDuration % 3600) / 60);
        seconds = (averageDuration % 3600) % 60;
        var duration = minutes + ":" + seconds;
        if(hours > 0){
          duration = hours + ":" + minutes + ":" + seconds;
        }
        var bar3 = Math.round(averageComment / maxComment * 100);
        var bar4 = Math.round(averageDuration / maxDuration * 100);



        

        
        // console.log(averageDuration);
      }else{
        var averageView = 100000;
        var averageComment = 123;
        var maxView = 200000;
        var duration = "5:24";
        var bar3 = 75;
        var bar4 = 35;

      }
      var bar1 = Math.round((averageView / maxView) * 100);

      return (
        <Row className="analytics-row">
          <Col lg={6} xl={3} className="analytics-col">
            <div className="text-light flex-wrap align-items-center h-100 shadow-1">
              <div className="flex-1">
                <span>Average View</span>
                  <h3 className="mb-0">{averageView}</h3>
                  <div className="card-icon"></div>
              </div>
              <div className="w-100 h-5 mt-4 mb-2">
              <ProgressBar now={bar1} />
              </div>
            </div>
          </Col>
          <Col lg={6} xl={3} className="analytics-col">
            <div className="text-light flex-wrap align-items-center h-100 shadow-1">
              <div className="flex-1">
                <span>Max View</span>
                  <h3 className="mb-0">{maxView}</h3>
                  <div className="card-icon"></div>
              </div>
              <div className="w-100 h-5 mt-4 mb-2">
              <ProgressBar now={100} />
              </div>
            </div>
          </Col>
          <Col lg={6} xl={3} className="analytics-col">
            <div className="text-light flex-wrap align-items-center h-100 shadow-1">
              <div className="flex-1">
                <span>Average Comments</span>
                  <h3 className="mb-0">{averageComment}</h3>
                  <div className="card-icon"></div>
              </div>
              <div className="w-100 h-5 mt-4 mb-2">
              <ProgressBar now={bar3} />
              </div>
            </div>
          </Col>
          <Col lg={6} xl={3}>
            <div className="text-light flex-wrap align-items-center h-100 shadow-1">
              <div className="flex-1">
                <span>Average Duration</span>
                  <h3 className="mb-0">{duration}</h3>
                  <div className="card-icon"></div>
              </div>
              <div className="w-100 h-5 mt-4 mb-2">
              <ProgressBar now={bar4} />
              </div>
            </div>
          </Col>

        </Row>
      );



    }
    // chartData: {
    //   labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    //   datasets: [{
    //       label: "Population (millions)",
    //       backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
    //       data: [2478,5267,734,784,433]
    //     }]
    // },
  
    getDate = () =>{
      var d = new Date();

      return 'Today ' + d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
    }

    renderBarChart = () => {
      if(this.props.videos.length > 0){
        var videos = this.props.videos;
        var data = [];
        var labels = [];
        for(var i = 0; i < 10; i++){
          data.push(videos[i].viewCount);
          labels.push(videos[i].title);
        }
        return <BarChart data={data} labels={labels} />
      }else{
        return <BarChart />
      }


    }


  render(){
    return (
      <div className="dash-container">
        {/* <div style={{marginTop: '2rem'}}> */}
        <Container className="analytics-container">
        <Row>
          <SearchInputTwo />
        </Row>
        <Row style={{ marginTop: "2rem"}}>
          <Col>
            <h2>Dashboard</h2>
            <p>Analytics of Videos</p>
          </Col>
          <Col xl={2}>
            <div className="reportrange-btn warning-gradient rounded-4" 
            style={{lineHeight: '1.9', textAlign: 'center', marginTop: '1rem'}}>
              {this.getDate()}
            </div>
          </Col>
        </Row>
  
          {this.renderOverview()}

        <Row className="analytics-row">
          <Col xl={6}className="chart-title left">
              Published Years of Videos
            </Col>
            <Col xl={6}className="chart-title">
              View Count of First 10 Videos
            </Col>
        </Row>
     
        <Row className="analytics-row">


          <Col xl={6} className="analytics-col">

  
              {this.renderPieChart()}
          
            
          </Col>
          <Col xl={6}>
              {this.renderBarChart()}
          </Col>
        </Row>
        {/* </div> */}
        </Container>
      </div>

    
    );
}



  

}


const mapStateToProps = (state) =>{
  return {videos: state.search};
};
export default connect(mapStateToProps)(Analyticsboard);