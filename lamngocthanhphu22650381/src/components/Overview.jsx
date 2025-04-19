import React, { useEffect, useState } from "react";
import "../css/Overview.css";
import { GoTriangleUp } from "react-icons/go";

export default function Overview() {
  const [totalTurnover, setTotalTurnover] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Turnover
        const turnoverRes = await fetch("http://localhost:3001/turnover");
        const turnoverData = await turnoverRes.json();
        const turnoverTotal = turnoverData.reduce(
          (sum, item) => sum + (item.amount || 0),
          0
        );
        setTotalTurnover(turnoverTotal);

        // Profit
        const profitRes = await fetch("http://localhost:3002/profit");
        const profitData = await profitRes.json();
        const profitTotal = profitData.reduce(
          (sum, item) => sum + (item.profitAmount || 0),
          0
        );
        setTotalProfit(profitTotal);

        // Customers
        const customerRes = await fetch("http://localhost:3003/customer");
        const customerData = await customerRes.json();
        setTotalCustomers(customerData.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const Card = ({ title, value, bgColor, img }) => (
    <div className="card-content" style={{ backgroundColor: bgColor }}>
      <div className="card-wrapper">
        <div className="card-left">
          <p>{title}</p>
          <h2>{value}</h2>
        </div>
        <div className="card-right">
          <img src={img} alt="" />
        </div>
      </div>
      <div className="card-bottom">
        <p className="precent">
          <GoTriangleUp />
          5.39%
        </p>
        <p>period of change</p>
      </div>
    </div>
  );

  return (
    <div className="container-overview">
      <div className="logo-overview">
        <img src="../../img/dashboard.png" alt="" />
        Overview
      </div>

      <div className="content-top">
        <Card
          title="Turnover"
          value={`$${totalTurnover}`}
          bgColor="#fff0f5"
          img="/img/turnover.png"
        />
        <Card
          title="Profit"
          value={`$${totalProfit}`}
          bgColor="#eff6ff"
          img="/img/profit.png"
        />
        <Card
          title="Customers"
          value={totalCustomers}
          bgColor="#f0f7fd"
          img="/img/customers.png"
        />
      </div>
    </div>
  );
}
