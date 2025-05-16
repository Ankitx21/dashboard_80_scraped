import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect, useState } from "react";
import axios from "axios";

const Featured = () => {
  const [data, setData] = useState({
    today: 0,
    this_week: {},
    last_week: 0,
    last_month: 0,
    last_3_months: {},
  });

  useEffect(() => {
    axios.get("https://webscrapper.inside-ai.xyz/api/articles/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching article stats:", err);
      });
  }, []);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total hours</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={data.today} text={`${data.today}`} strokeWidth={5} />
        </div>
        <p className="title">Total Articles Scraped Today</p>
        <p className="amount">{data.today}</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">50</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className={`itemResult ${data.last_week >= 0 ? "positive" : "negative"}`}>
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">{data.last_week}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className={`itemResult ${data.last_month >= 0 ? "positive" : "negative"}`}>
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">{data.last_month}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
