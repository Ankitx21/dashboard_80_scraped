import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import axios from "axios";

const Chart = ({ aspect, title }) => {
  const [filter, setFilter] = useState("last_3_months");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get("https://webscrapper.inside-ai.xyz/api/articles/")
      .then((res) => {
        console.log(res);
        const data = res.data;
         
        if (filter === "last_3_months") {
          const formatted = Object.entries(data.last_3_months).map(([key, val]) => {
            const monthName = new Date(key + "-01").toLocaleString("default", { month: "long" });
            return { name: monthName, Total: val };
          });
          console.log(formatted)
          setChartData(formatted);
        } else if (filter === "this_week") {
          const weekOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
          const formatted = weekOrder.map(day => ({
            name: day,
            Total: data.this_week[day] || 0,
          }));
          setChartData(formatted);
        }
      })
      .catch((err) => console.error("Error loading chart data", err));
  }, [filter]);

  return (
    <div className="chart">
      <div className="title">
        <span>{filter === "last_3_months" ? "Last 3 Months" : "This Week"} (Articles)</span>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="chart-filter">
          <option value="last_3_months">Last 3 Months</option>
          <option value="this_week">This Week</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
          <defs>
  <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
    {filter === "last_3_months" ? (
      <>
        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
      </>
    ) : (
      <>
        <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} /> {/* green/teal */}
        <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
      </>
    )}
  </linearGradient>
</defs>

          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
  type="monotone"
  dataKey="Total"
  stroke={filter === "last_3_months" ? "#8884d8" : "#34d399"}
  fill="url(#total)"
  fillOpacity={1}
/>

        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
