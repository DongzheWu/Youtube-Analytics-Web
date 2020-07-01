import React from 'react';
import SearchBar from './SearchBar';
import VideoList from './VideoList';

const Landing = () => {
  return (
    <main>
      
      <div className="main-container">
        <SearchBar />
        <VideoList />
        <span className="icon-search"></span>
      </div>


    </main>

  );
};

export default Landing;