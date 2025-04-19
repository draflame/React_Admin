import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "../css/DetailedReport.css";
import { FaRegUserCircle } from "react-icons/fa";
import { CiImport, CiExport } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
const DetailedReport = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3003/customer");
        const json = await res.json();
        setUsers(json); // Dữ liệu của bạn nằm trong mảng `users`
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);
  console.log(users);

  const columns = [
    {
      name: "Customer Name",
      selector: (row) => row.customerName,
      sortable: true,
    },
    {
      name: "Company",
      selector: (row) => row.company,
      sortable: true,
    },
    {
      name: "Order Value",
      selector: (row) => `$${row.orderValue}`,
      sortable: true,
    },
    {
      name: "Order Date",
      selector: (row) => row.orderDate,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => getStatusBadge(row.status),
      center: true,
    },
    {
      name: "",
      cell: (row) => (
        <button className="button-action">
          <GoPencil className="icon-action" />
        </button>
      ),
      center: true,
    },
  ];

  const getStatusBadge = (status) => {
    let className = "badge ";
    switch (status) {
      case "New":
        className += "badge-new";
        break;
      case "In-progress":
        className += "badge-inprogress";
        break;
      case "Completed":
        className += "badge-completed";
        break;
      default:
        className += "badge-default";
    }
    return <span className={className}>{status}</span>;
  };

  return (
    <div className="container-detailed-report">
      <div className="header-detailed-report">
        <div className="logo-detailed-report">
          <img src="../../img/File text 1.png" alt="" />
          Detailed Report
        </div>
        <div className="button-ex-im">
          <button className="button-import">
            <FaRegUserCircle /> Add user
          </button>
          <button className="button-import">
            <CiImport /> Import
          </button>
          <button className="button-export">
            <CiExport /> Export
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={users}
        pagination
        highlightOnHover
        selectableRows
      />
    </div>
  );
};

export default DetailedReport;
