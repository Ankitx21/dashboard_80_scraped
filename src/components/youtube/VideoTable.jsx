import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import './videoTable.scss'; // Add your styles here
import axios from 'axios';

const truncateText = (text, maxLength = 150) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

const VideoTable = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://webscrapper.inside-ai.xyz/api/videos/');
        setVideos(response.data);
      } catch (err) {
        setError('Failed to fetch videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div style={{ padding: '20px', width: '100%' }}>
          <h2>YouTube Videos</h2>

          {loading ? (
            <p>Loading videos...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <table className="video-table">
              <thead>
                <tr>

                  <th>Title</th>
                  <th>Link</th>
                  <th>Transcript</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video) => (
                  <tr key={video.video_id}>

                    <td>{video.video_title}</td>
                    <td>
                      <a
                        href={video.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch
                      </a>
                    </td>
                    <td>{truncateText(video.transcript)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoTable;
