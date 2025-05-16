import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import './channelsTable.scss'; // Add your styles here
import axios from 'axios';

const ChannelsTable = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get('https://webscrapper.inside-ai.xyz/api/channels/');
        setChannels(response.data);
      } catch (err) {
        setError('Failed to fetch channels');
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div style={{ padding: '20px', width: '100%' }}>
          <h2>YouTube Channels</h2>

          {loading ? (
            <p>Loading channels...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <table className="channels-table">
              <thead>
                <tr>
                  <th>Channel ID</th>
                  <th>Channel Name</th>
                  <th>Channel URL</th>
                </tr>
              </thead>
              <tbody>
                {channels.map((channel) => (
                  <tr key={channel.channel_id}>
                    <td>{channel.channel_id}</td>
                    <td>{channel.channel_name}</td>
                    <td>
                      <a
                        href={channel.channel_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Channel
                      </a>
                    </td>
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

export default ChannelsTable;
