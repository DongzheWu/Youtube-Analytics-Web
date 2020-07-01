import React from 'react';
import TrackList from './TrackList';
import RecordList from './RecordList';
import '../assets/css/Dashboard.css';
import { Container } from 'react-bootstrap';

class Dashboard extends React.Component{





  render(){

    return (
      <main className="dash-container">
          < Container>
          <div className="form-combine"><TrackList /></div>
          <RecordList />
          </Container>

      </main>

    
    );

  
  }
}


export default Dashboard;