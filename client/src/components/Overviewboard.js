import React, { useState } from "react";
import logo from './google-icon.svg';
import '../assets/css/Overviewboard.css';

import { Row, Col, Image, Container } from 'react-bootstrap';

function Overviewboard(){



    return (
        <div className="dash-container" style={{background:'rgba(9, 147, 186,1)'}}>
 
            <Container>
                <Row className="over-row">
                        <Col align="center" lg={6} sm={12}>
                            <div>
                            <h2>Search Videos</h2>
                            <p>Search keywords by using search bar to get information such as title, description, tags from YouTube videos.
                                YouTube Tags are words and phrases used to give YoTube context about a video. Tags are considered an important ranking factor in YouTube's search algorithm.
                                The Tags for each videos are usually hiden behind YouTube web page. Using our search function, it cannot only display basic information of videos, it can aslo display the tags which is used by other youtubers to help you optimize your SEO strategy </p>
                            </div>
                        </Col>
                        <Col align="center" lg={6} sm={12}>
                            <Image src={require("../assets/img/overview/search2.jpg")} thumbnail height="500px" width="500px"/>
                        
                        </Col>
                    </Row>
                <Row className="over-row-2">
                        <Col align="center" lg={6, {order: 2}} sm={12}>
                            <div>
                            <h2>Analytics</h2>
                            <p>It provides analytics of the videos which are related to the topic you searched. We provide average view count, average duration, published time ect analytics of the videos.
                                The information can help you to understand if the topic can get enough attention and if it has many or few competitive videos this year.
                            </p>
                            </div>
                            
                        
                        </Col>
                        <Col align="center" lg={6, {order: 1}} sm={12}>
                        <Image src={require("../assets/img/overview/analytics3.jpg")} thumbnail height="500px" width="500px"/>

                        </Col>

                </Row>
                <Row className="over-row">
                        <Col align="center" lg={6} sm={12}>
                            <div>
                            <h2>Keywords</h2>
                            <p>We are still developing this function </p>
                            </div>
                        </Col>
                        <Col align="center" lg={6} sm={12}>
                            <Image src={require("../assets/img/overview/search2.jpg")} thumbnail height="500px" width="500px"/>
                        
                        </Col>
                    </Row>
                    <Row className="over-row-2">
                    <Col align="center" lg={6, {order: 2}} sm={12}>
                            <div>
                            <h2>Trend</h2>
                            <p>We provide the relative search volume of the topics. You can compare the search volumes with at most 5 topics.
                                The data is provided by Google Trend. You can save any words you searched by using our website, if you would like to register as a new user. It is more convenient platform
                                 to help you schedule your next video topic.
                            </p>
                            </div>
                            
                        
                        </Col>
                        <Col align="center" lg={6, {order: 1}} sm={12}>
                        <Image src={require("../assets/img/overview/trend.jpg")} thumbnail height="500px" width="500px"/>

                        </Col>

                </Row>
                <Row className="over-row">
                        <Col align="center" lg={6} sm={12}>
                            <div>
                            <h2>Hot Map</h2>
                            <p>Hot Map provides the world map. You can click a specific country on the map to get the most popular search topics today.
                                It can help you to have a better understanding what is happening all over the world and may give inspirations to you to make better videos.</p>
                            </div>
                        </Col>
                        <Col align="center" lg={6} sm={12}>
                            <Image src={require("../assets/img/overview/map.jpg")} thumbnail height="500px" width="500px"/>
                        
                        </Col>
                    </Row>
                    <Row className="over-row-2">
                    <Col align="center" lg={6, {order: 2}} sm={12}>
                            <div>
                            <h2>Track</h2>
                            <p>
                                You  can add any topics you are insterested to track page. It will track top 20 videos of each topics.
                                It is more convenient for YouTubers to get the view count increasement of each video. We can easily target
                                the specific videos or topics don't have high total view count, but they have high view count increasement.
                                Therefore, the content, title or description of such kind videos may give more inspirations for our next videos.
                            </p>
                            </div>
                            
                        
                        </Col>
                        <Col align="center" lg={6, {order: 1}} sm={12}>
                        <Image src={require("../assets/img/overview/track.jpg")} thumbnail height="500px" width="500px"/>

                        </Col>

                </Row>
                </Container>
    
        </div>



    
    );

  

}


export default Overviewboard;