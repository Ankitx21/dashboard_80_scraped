import { useEffect, useState } from "react";
import axios from "axios";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

const List = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Update the API endpoint to your local Django backend
        const response = await axios.get("https://webscrapper.inside-ai.xyz/api/count/");

        console.log("API Response:", response.data);

        if (!response.data || !response.data.article) {
          throw new Error("Invalid API response format");
        }

        const formattedData = response.data.article.map((item, index) => ({
          id: index + 1,
          url: item.URL || "N/A",
          domain: item.Domain || "Unknown",
          activeStatus: item["Active Status"],
          automationRunning: item.is_automation_running,
        }));

        setRows(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="scraped data table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">No</TableCell>
            <TableCell className="tableCell">URL</TableCell>
            <TableCell className="tableCell">Domain</TableCell>
            <TableCell className="tableCell">Active Status</TableCell>
            <TableCell className="tableCell">Automation Running</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Error: {error}
              </TableCell>
            </TableRow>
          ) : rows.length > 0 ? (
            rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <a href={row.url} target="_blank" rel="noopener noreferrer">
                    {row.url}
                  </a>
                </TableCell>
                <TableCell>{row.domain}</TableCell>
                <TableCell>{String(row.activeStatus)}</TableCell>
                <TableCell>{String(row.automationRunning)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No Data Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
