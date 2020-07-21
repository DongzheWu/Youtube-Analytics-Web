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

    return <li><span className="rank">No. {index + 1}</span><span className="rank-title">{tops[index].title.query} </span><span className="search-volume">{tops[index].formattedTraffic}</span></li>
      });
    
  }


  render(){

    if(this.props.topData.trendingSearches){


        return (
            <div style={{marginTop: '1rem'}}>
            <ui><span className="rank">Rank</span><span className="rank-title">Hot Topics</span><span className="search-volume">Search Volume</span></ui>
            <ul className="list-group">{this.renderList(this.props.topData.trendingSearches)}</ul>
            </div>
          
        );
    }else{
      return (
      <div>
      <div className="rank-des">Click a specific country, 
      the today's hot topics of the country will be dispalyed on the board.
      </div>
      <div className="rank-note">Note: It may not display hot topics of some countries, if these countries don't have enough search volume.</div>
      </div>);
    }

  
  }
}


function mapStateToProps(state) {

  return {
    topData: state.topData
  };
}

export default connect(mapStateToProps, {})(TopList);