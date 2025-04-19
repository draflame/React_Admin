import React, { useState, useEffect } from "react";
import "../css/EditModel.css";

export default function EditModal({ isOpen, onClose, user, onSave }) {
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    setEditedUser(user); // Cập nhật lại giá trị user khi modal mở
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(editedUser); // Gọi hàm lưu thông tin người dùng
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit User</h2>
        <form onSubmit={handleSave}>
          <label>
            Customer Name:
            <input
              type="text"
              name="customerName"
              value={editedUser?.customerName || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Company:
            <input
              type="text"
              name="company"
              value={editedUser?.company || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Order Value:
            <input
              type="number"
              name="orderValue"
              value={editedUser?.orderValue || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Order Date:
            <input
              type="date"
              name="orderDate"
              value={editedUser?.orderDate || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={editedUser?.status || ""}
              onChange={handleInputChange}
            >
              <option value="New">New</option>
              <option value="In-progress">In-progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
