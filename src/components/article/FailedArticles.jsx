import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "../table/table.scss"; // assuming table.scss exists!

const FailedArticles = () => {
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://webscrapper.inside-ai.xyz/api/failed/");
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      const data = response.data;

      setCount(data.count);
      setNextPageUrl(data.next);
      setPrevPageUrl(data.previous);

      const formattedData = data.results.map((item, index) => ({
        id: index + 1, // S.No for page
        article: item.article || "N/A",
        created: item.created ? new Date(item.created).toLocaleString() : "N/A",
        reason: item.reason || "N/A",
      }));

      setRows(formattedData);
    } catch (error) {
      console.error("Error fetching failed articles:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPageUrl);
  }, [currentPageUrl]);

  const handleNextPage = () => {
    if (nextPageUrl) {
      setCurrentPageUrl(nextPageUrl);
    }
  };

  const handlePrevPage = () => {
    if (prevPageUrl) {
      setCurrentPageUrl(prevPageUrl);
    }
  };

  const columns = [
    { field: "id", headerName: "S.No", width: 70 },
    { field: "article", headerName: "Article URL", width: 400 },
    { field: "created", headerName: "Created At", width: 200 },
    { field: "reason", headerName: "Failure Reason", width: 500 },
  ];

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div style={{ height: 700, width: "100%", padding: "20px" }}>
          <h2>Failed Articles</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[20]}
                disableSelectionOnClick
                autoHeight
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                  gap: "20px",
                }}
              >
                <button onClick={handlePrevPage} disabled={!prevPageUrl}>
                  Previous
                </button>
                <button onClick={handleNextPage} disabled={!nextPageUrl}>
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FailedArticles;
