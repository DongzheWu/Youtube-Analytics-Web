import React, { useState } from "react";
import { Container } from 'react-bootstrap';
import MapChart from './MapChart';
import TopList from './TopList';
import ReactTooltip from "react-tooltip";
function Mapboard(){
const [content, setContent] = useState("");
 


    return (
      <main className="dash-container">
          < Container>
          <div className="col">
            <MapChart setTooltipContent={setContent} />
            <ReactTooltip>{content}</ReactTooltip>
            </div>
            <div className="col">
                <TopList />
            </div>
            
          </Container>

      </main>

    
    );

  

}


export default Mapboard;