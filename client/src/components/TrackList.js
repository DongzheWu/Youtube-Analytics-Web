import React from 'react';
import { connect } from 'react-redux';
import { getTrack } from '../actions';
import TrackItem from './TackItem';
import AddTrack from './AddTrack';

class TrackList extends React.Component{


  componentDidMount(props){
    this.props.getTrack();

  }

  renderList = (tracks) =>{

    return Object.keys(tracks).map((track, index) => {

        return <TrackItem key={index} index={index} word={tracks[index]} />;
      });
    
  }


  render(){

    if(this.props.tracks){


        return (
            <div>
              <AddTrack />
            <ul className="list-group">{this.renderList(this.props.tracks)}</ul>
            </div>
          
        );
    }else{
      return <div><AddTrack /></div>;
    }

  
  }
}


function mapStateToProps(state) {
  return {
    tracks: state.tracks
  };
}

export default connect(mapStateToProps, {getTrack})(TrackList);