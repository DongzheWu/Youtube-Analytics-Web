import React from "react";
import {Col, Row, Container, ProgressBar} from "react-bootstrap";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import { connect } from 'react-redux';
import '../assets/css/analyticsboard.css';
import AnalyticsInput from './AnalyticsInput';

class Analyticsboard extends React.Component{

  /** Classify videos basing on its publish year */
  checkYears = (videos, cur) => {
    
    let years = [0, 0, 0, 0, 0, 0];
    if(videos.length > 0){
      for(let i = 0; i < videos.length; i++){
        let year = videos[i].publishedAt.split("-")[0];
        switch(year){
          case String(cur):
            years[0]++;
            break;
          case String(cur - 1):
            years[1]++;
            break;
          case String(cur - 2):
            years[2]++;
            break;
          case String(cur - 3):
            years[3]++;
            break;
          case String(cur - 4):
            years[4]++;
            break;
          default:
            years[5]++;
        }
      }
    }
    return years;
  }

   /** Render pie chart to display the number videos published different year. */
  renderPieChart = () => {
    const videos = this.props.videos;
    let cur = new Date().getFullYear();
    if(videos.length > 0){
      let years = this.checkYears(videos, cur);
      var chartData = {
        labels: [cur, cur - 1, cur - 2, cur - 3, cur - 4, "Others"],
        datasets: {
            label: "Published Year",
            backgroundColor: ["#24C9F6", "#2af270","#f7f794","#f74545","#f745e5", '#9b34eb'],
            data: [years[0], years[1], years[2], years[3], years[4], years[5]]
          }
      }
      return <PieChart chartData={chartData}/>
    }
    return <PieChart />;
  }

  /** Convert duration of the video into seconds */
  durationToSeconds = (duration) => {
    let hours   = 0;
    let minutes = 0;
    let seconds = 0;
    
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


  /** Calculate information of the videos */
  infoCalculate = (videos) => {
    let maxComment = 100, maxDuration = 100, sumComment = 0, sumDuration = 0, sumView = 0, averageDuration = 35;
    let averageView = 100000, averageComment = 75, maxView = 200000, duration = "5:24";
    if(videos.length > 0){
      let hours = 0, minutes = 0, seconds = 0;
      for(let i = 0; i < videos.length; i++){
        sumView += parseInt(videos[i].viewCount, 10)
        maxView = Math.max(maxView, parseInt(videos[i].viewCount, 10));
        maxComment = Math.max(maxComment, parseInt(videos[i].commentCount, 10));
        //Some videos turn off comments, commentCount should be undefined.
        if(videos[i].commentCount){
          sumComment += parseInt(videos[i].commentCount, 10);
        }
        sumDuration += this.durationToSeconds(videos[i].duration);
        maxDuration = Math.max(maxDuration, this.durationToSeconds(videos[i].duration));
      }

      averageView = Math.round(sumView / videos.length);
      averageComment = Math.round(sumComment / videos.length);
      averageDuration = Math.round(sumDuration / videos.length);
      hours = Math.round(averageDuration / 3600);
      minutes = Math.round((averageDuration % 3600) / 60);
      seconds = (averageDuration % 3600) % 60;
      duration = minutes + ":" + seconds;
      if(hours > 0){
        duration = hours + ":" + minutes + ":" + seconds;
      }
    }
    return {averageComment: averageComment, 
      maxComment: maxComment, 
      averageDuration: averageDuration, 
      maxDuration: maxDuration, 
      averageView: averageView, 
      maxView: maxView,
      duration: duration};
  }

  /** Render data analytic overview*/
  renderOverview = () => {
    const info = this.infoCalculate(this.props.videos);
    let bar3 = Math.round(info.averageComment / info.maxComment * 100);
    let bar4 = Math.round(info.averageDuration / info.maxDuration * 100);
    let bar1 = Math.round((info.averageView / info.maxView) * 100);

    return (
      <Row className="analytics-row">
        <Col lg={6} xl={3} className="analytics-col">
          <div className="text-light flex-wrap align-items-center h-100 shadow-1">
            <div className="flex-1">
              <span>Average View</span>
              <h3 className="mb-0">{info.averageView}</h3>
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
              <h3 className="mb-0">{info.maxView}</h3>
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
              <h3 className="mb-0">{info.averageComment}</h3>
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
              <h3 className="mb-0">{info.duration}</h3>
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

  /** Render dashboard for analytics*/
  render(){
    return (
      <div className="dash-container">
        <Container className="analytics-container">
          <Row>
            <AnalyticsInput />
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
        </Container>
      </div>
    );
  }
}


const mapStateToProps = (state) =>{
  return {videos: state.search};
};
export default connect(mapStateToProps)(Analyticsboard);