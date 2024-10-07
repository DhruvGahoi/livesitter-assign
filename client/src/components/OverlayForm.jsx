import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import Overlay from './components/Overlay';
import OverlayForm from './components/OverlayForm';

function App() {
  const [rtspUrl, setRtspUrl] = useState('');
  const [overlays, setOverlays] = useState([{ id: 1, content: 'Test Overlay', position: { x: 0, y: 0 } }]);

  const addOverlay = (overlay) => {
    setOverlays([...overlays, { ...overlay, id: Date.now() }]);
  };

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
      <OverlayForm onSubmit={addOverlay} />
    </div>
  );
}

export default App;