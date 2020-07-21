import React, { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import MapChart from './MapChart';
import TopList from './TopList';
import ReactTooltip from "react-tooltip";
function Mapboard(){
const [content, setContent] = useState("");
 


    return (
      <main className="dash-container">
        <div style={{marginLeft: '5%', marginRight: '5%', marginTop: '3%'}}>
          <Row style={{border: '1px solid rgba(42, 242, 112, 0.2)'}}>

          <Col sm={12}lg={8}>
            <MapChart setTooltipContent={setContent}/>
            <ReactTooltip>{content}</ReactTooltip>
            </Col>
            <Col sm={12} lg={4} style={{border: '1px solid rgba(42, 242, 112, 0.2)'}}>
                <TopList />
            </Col>
            </Row>
        
            </div>
      </main>

    
    );

  

}


export default Mapboard;