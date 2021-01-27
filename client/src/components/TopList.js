import React from 'react';
import { connect } from 'react-redux';
import '../assets/css/topList.css';

/** Create hot topics list */
class TopList extends React.Component{

  renderList = (tops) =>{
    return tops.map((top, index) => {
      return <li key= {tops[index].title.query}>
        <span className="rank">No. {index + 1}</span>
        <span className="rank-title">{tops[index].title.query} </span>
        <span className="search-volume">{tops[index].formattedTraffic}</span>
        </li>
      }
    );
  }

  render(){
    if(this.props.topData.trendingSearches){
        
      return (
        <div style={{marginTop: '1rem'}}>
          <div><span className="rank">Rank</span><span className="rank-title">Hot Topics</span><span className="search-volume">Search Volume</span></div>
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

const mapStateToProps = (state) => {
  return {
    topData: state.topData
  };
}

export default connect(mapStateToProps, {})(TopList);