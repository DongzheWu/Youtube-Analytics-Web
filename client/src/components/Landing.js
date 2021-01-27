import React from 'react';
import SearchBar from './SearchBar';
import VideoList from './VideoList';

/** This component is to diplay dashboard page for video search. */
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