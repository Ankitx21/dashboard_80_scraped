import { useEffect, useState } from "react";
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import axios from "axios";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === "user") {
          const res = await axios.get("https://webscrapper.inside-ai.xyz/api/");
          setAmount(res.data.count);
        } else if (type === "order") {
          const res = await axios.get("https://webscrapper.inside-ai.xyz/api/count/");
          setAmount(res.data.count);
        } else if (type === "earning") {
          const res = await axios.get("https://webscrapper.inside-ai.xyz/api/fail/");
          console.log("hello", res.data);
          setAmount(res.data.failed_article_count);
        }
      } catch (err) {
        console.error("Error fetching widget data:", err);
      }
    };

    // Only fetch data if type is not 'balance'
    if (type !== "balance") {
      fetchData();
    }
  }, [type]);

  let data;

  switch (type) {
    case "user":
      data = {
        title: "Total Articles",
        isMoney: false,
        link: "See articles",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "Total Active Sources",
        isMoney: false,
        link: "View active sources",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "Total Articles Failed",
        isMoney: false,
        link: "View articles failed",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "Article Details",
        isMoney: false,
        link: "View article details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        
        {/* Show counter only if type is not 'balance' */}
        {type !== "balance" && (
          <span className="counter">
            {data.isMoney ? "₹" : ""} {amount}
          </span>
        )}
        
        {/* Show link as Link component for 'balance' type, regular span for others */}
        {type === "balance" ? (
          <Link to="/articles" className="link balance-link">
            {data.link}
          </Link>
        ) : (
          <span className="link">{data.link}</span>
        )}
      </div>
      
      <div className="right">
        {type !== "balance" && (
          <div className="percentage positive">
            <KeyboardArrowUpIcon />
          </div>
        )}
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;