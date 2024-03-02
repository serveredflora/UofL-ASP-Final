import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Account() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    // Redirect if not logged in
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChangePasswordClick = () => {
    setShowChangePassword(true);
  };

  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmNewPasswordChange = (e) => setConfirmNewPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    // Assuming the username is stored in localStorage when the user logs in
    const username = localStorage.getItem("username");
  
    try {
      const response = await fetch("/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({
          username, // Include the username in the request body
          newPassword,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update password");
      }
  
      const data = await response.json();
      alert("Password changed successfully!");
      setShowChangePassword(false);
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error changing password. Please try again.");
    }
  };
  

  const username = localStorage.getItem("username");

  return (
    <div className="account-page max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800">Account Settings</h2>
      <div className="mt-4">
        <span className="block text-lg text-gray-700">Username: </span>
        <span className="text-lg text-gray-900 font-medium">{username}</span>
      </div>
      <button
        onClick={handleChangePasswordClick}
        className="mt-6 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
      >
        Change Password
      </button>

      {showChangePassword && (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
              New Password:
            </label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="confirm-new-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password:
            </label>
            <input
              type="password"
              id="confirm-new-password"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default Account;
