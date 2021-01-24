import React from 'react';
import { connect } from 'react-redux';
import RecordItem from './RecordItem';
import '../assets/css/RecordList.css';
import RecordLineChart from './RecordLineChart';
import SordDrop from './SortDrop';

class RecordList extends React.Component{
    
  renderList = (videos) =>{

    return Object.keys(videos).map((index, video) => {

        return <RecordItem key={index} video={videos[index]}/>;

      });
    
  }


    render(){
        if(this.props.videos){
            
            return (
            <div className="row">
              
              <div className="col">
                <div>
                <SordDrop display = { this.props.videos.length > 0 ? true : false}/>
                {this.renderList(this.props.videos)}
                </div>
              </div>
              <div className="col"><RecordLineChart/></div>
              </div>
              );
        }else{
            return <div></div>;
        }

    }

}


function mapStateToProps(state) {

    return {
      videos: state.info
    };
  }
  
  export default connect(mapStateToProps, {})(RecordList);