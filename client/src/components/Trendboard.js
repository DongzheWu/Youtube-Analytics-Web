import React from 'react';
import { Container } from 'react-bootstrap';
import AddTrend from './AddTrend';
import TrendList from './TrendList';
import TrendChart from './TrendChart';
class Trendboard extends React.Component{





  render(){

    return (
      <main className="dash-container">
          < Container>
            <AddTrend />
            <TrendList />
            <TrendChart />
          </Container>

      </main>

    
    );

  
  }
}


export default Trendboard;