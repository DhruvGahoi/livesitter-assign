import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';

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

function OverlayForm({ onSubmit }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ content });
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Overlay content"
      />
      <button type="submit">Add Overlay</button>
    </form>
  );
}

function App() {
  const [rtspUrl, setRtspUrl] = useState('');
  const [overlays, setOverlays] = useState([]);

  useEffect(() => {
    fetchOverlays();
  }, []);

  const fetchOverlays = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/overlays');
      setOverlays(response.data);
    } catch (error) {
      console.error('Error fetching overlays:', error);
    }
  };

  const addOverlay = async (overlay) => {
    try {
      await axios.post('http://localhost:5000/api/overlays', overlay);
      fetchOverlays();
    } catch (error) {
      console.error('Error adding overlay:', error);
    }
  };

  const [editingOverlay, setEditingOverlay] = useState(null);

  const updateOverlay = async (id, updatedOverlay) => {
    try {
      await axios.put(`http://localhost:5000/api/overlays/${id}`, updatedOverlay);
      fetchOverlays();
      setEditingOverlay(null);
    } catch (error) {
      console.error('Error updating overlay:', error);
    }
  };

  const deleteOverlay = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/overlays/${id}`);
      fetchOverlays();
    } catch (error) {
      console.error('Error deleting overlay:', error);
    }
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
        <div key={overlay._id}>
          <Overlay content={overlay.content} />
          <button onClick={() => setEditingOverlay(overlay)}>Edit</button>
          <button onClick={() => deleteOverlay(overlay._id)}>Delete</button>
        </div>
      ))}
      <OverlayForm 
        onSubmit={editingOverlay ? 
          (updatedOverlay) => updateOverlay(editingOverlay._id, updatedOverlay) : 
          addOverlay
        }
        initialValues={editingOverlay}
      />
    </div>
  );
}

export default App;