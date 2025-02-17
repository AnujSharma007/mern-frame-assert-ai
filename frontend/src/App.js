import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import VideoGrid from './components/VideoGrid';
import './styles/App.css';

const socket = io('http://localhost:5000');

const App = () => {
  const [frames, setFrames] = useState(Array(4).fill(null));

  useEffect(() => {
    socket.on('frames', (newFrames) => {
      setFrames(newFrames);
    });
  }, []);

  return (
    <div className="app">
      <h1>Video Frame Streamer</h1>
      <VideoGrid frames={frames} />
    </div>
  );
};

export default App;