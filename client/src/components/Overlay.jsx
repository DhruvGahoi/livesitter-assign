import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import Overlay from './components/Overlay';

function App() {
  const [rtspUrl, setRtspUrl] = useState('');
  const [overlays, setOverlays] = useState([{ id: 1, content: 'Test Overlay', position: { x: 0, y: 0 } }]);

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
      {overlays.map((overlay) => (
        <Overlay key={overlay.id} {...overlay} />
      ))}
    </div>
  );
}

export default App;