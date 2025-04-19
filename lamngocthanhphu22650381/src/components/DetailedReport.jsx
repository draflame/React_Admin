import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "../css/DetailedReport.css";
import { FaRegUserCircle } from "react-icons/fa";
import { CiImport, CiExport } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import EditModal from "./EditModel";
const DetailedReport = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSaveUser = async (updatedUser) => {
    try {
      // Cập nhật dữ liệu người dùng lên server
      const res = await fetch(
        `http://localhost:3003/customer/${updatedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (res.ok) {
        const updatedUsers = users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        setUsers(updatedUsers); // Cập nhật lại danh sách người dùng trong state
        setIsModalOpen(false); // Đóng modal sau khi lưu thành công
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };
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
      sortable: true,
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
        <button className="button-action" onClick={() => handleEditUser(row)}>
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
      <EditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={editingUser}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default DetailedReport;
