import React from 'react';
import { connect } from 'react-redux';
import '../assets/css/TopList.css';

class TopList extends React.Component{



  renderList = (tops) =>{

    // return tops.forEach(top => {
    //     console.log(top.title.query);
    //     return (<li><span>{top.title.query} </span><span> {top.formattedTraffic}</span></li>);
    // });

    return tops.map((top, index) => {

    return <li><span className="rank">No. {index + 1}</span><span className="rank-title">{tops[index].title.query} </span><span className="search-volume">Search Volume: {tops[index].formattedTraffic}</span></li>
      });
    
  }


  render(){

    if(this.props.topData.trendingSearches){


        return (
            <div>
            <ul className="list-group">{this.renderList(this.props.topData.trendingSearches)}</ul>
            </div>
          
        );
    }else{
      return <div></div>;
    }

  
  }
}


function mapStateToProps(state) {

  return {
    topData: state.topData
  };
}

export default connect(mapStateToProps, {})(TopList);