import React from 'react';

const VideoGrid = ({ frames }) => {
  return (
    <div className="video-grid">
      {frames.map((frame, index) => (
        <div key={index} className="grid-item">
          {frame ? <img src={frame} alt={`Frame ${index}`} /> : <p>Loading...</p>}
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;