import React from 'react';

function Overlay({ content }) {
  return (
    <div style={{
      position: 'absolute',
      padding: '10px',
      background: 'rgba(255,255,255,0.5)',
      top: '50px',
      left: '50px',
    }}>
      {content}
    </div>
  );
}

function App() {
  const [rtspUrl, setRtspUrl] = useState('');
  const [overlays, setOverlays] = useState([{ id: 1, content: 'Test Overlay' }]);

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
        <Overlay key={overlay.id} content={overlay.content} />
      ))}
    </div>
  );
}

export default App;