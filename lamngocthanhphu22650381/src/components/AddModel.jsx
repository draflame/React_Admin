import React, { useState } from "react";
// import "../css/AddModel.css";

export default function AddModal({ isOpen, onClose, onAdd }) {
  const [newUser, setNewUser] = useState({
    customerName: "",
    company: "",
    orderValue: "",
    orderDate: "",
    status: "New",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      // Gửi yêu cầu POST để thêm người dùng mới
      const res = await fetch("http://localhost:3003/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        const addedUser = await res.json(); // Lấy dữ liệu người dùng đã thêm
        onAdd(addedUser); // Gọi hàm onAdd để thêm người dùng vào danh sách trong DetailedReport
        onClose(); // Đóng modal sau khi thêm người dùng thành công
      } else {
        console.error("Failed to add user.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New User</h2>
        <form onSubmit={handleAdd}>
          <label>
            Customer Name:
            <input
              type="text"
              name="customerName"
              value={newUser.customerName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Company:
            <input
              type="text"
              name="company"
              value={newUser.company}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Order Value:
            <input
              type="number"
              name="orderValue"
              value={newUser.orderValue}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Order Date:
            <input
              type="date"
              name="orderDate"
              value={newUser.orderDate}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={newUser.status}
              onChange={handleInputChange}
            >
              <option value="New">New</option>
              <option value="In-progress">In-progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
          <div className="modal-buttons">
            <button type="submit">Add</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
