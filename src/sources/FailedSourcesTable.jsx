import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import axios from 'axios';
import './baje.scss'; 
const FailedSourcesTable = () => {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('https://webscrapper.inside-ai.xyz/api/failed-sources/')
      .then((response) => {
        setSources(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch failed sources');
        setLoading(false);
      });
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div style={{ padding: '20px', width: '100%' }}>
          <h2>Failed Sources</h2>

          {loading ? (
            <p>Loading sources...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <table className="channels-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>URL</th>
                  <th>Domain</th>
                  <th>Failed Count</th>
             
                </tr>
              </thead>
              <tbody>
                {sources.map((source) => (
                  <tr key={source.id}>
                    <td>{source.id}</td>
                    <td>
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        Visit
                      </a>
                    </td>
                    <td>{source.domain}</td>
                    <td>{source.failed_count}</td>
                
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

export default FailedSourcesTable;
