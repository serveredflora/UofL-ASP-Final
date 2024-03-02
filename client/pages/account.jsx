import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Account() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");
  const username = localStorage.getItem("username");

  useEffect(() => {
    // Redirect if not logged in
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleChangePasswordClick = () => {
    setShowChangePassword(true);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Implement your password change logic here
    alert("Password changed successfully!");
    // Reset state after change
    setShowChangePassword(false);
    setNewPassword("");
    setConfirmNewPassword("");
  };

  if (!token) return null; 

  return (
    <div className="account-page">
      <h2>Account Settings</h2>
      <div>Username: {username}</div>
      <button onClick={handleChangePasswordClick}>Change Password</button>

      {showChangePassword && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="new-password">New Password:</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </div>
          <div>
            <label htmlFor="confirm-new-password">Confirm New Password:</label>
            <input
              type="password"
              id="confirm-new-password"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default Account;
