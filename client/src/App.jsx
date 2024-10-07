import React, { useState } from 'react';
import ReactPlayer from 'react-player';

function App() {
  const [rtspUrl, setRtspUrl] = useState('');

  return (
    <div className="App">
      <h1>Livestream App</h1>
      <input
        type="text"
        value={rtspUrl}
        onChange={(e) => setRtspUrl(e.target.value)}
        placeholder="Enter RTSP URL"
      />
      {rtspUrl && <ReactPlayer url={rtspUrl} controls />}
    </div>
  );
}

export default App;