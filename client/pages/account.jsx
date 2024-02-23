import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Account() {
  // State management
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  // Check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, []);

  // Handle input change
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Login successful", data);
        localStorage.setItem("userToken", data.token); // Save token to localStorage
        setIsLoggedIn(true);
        setError("");
      } else {
        setError(data.error || "An error occurred");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to connect to the server");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setError("");
  };

  // Conditional rendering based on login status
  if (isLoggedIn) {
    return (
      <div className="flex flex-col items-center space-y-8">
        <h2 className="font-bold">You are logged in!</h2>
        <button
          onClick={handleLogout}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 items-center">
      <h2 className="font-bold">Account Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <label htmlFor="username" className="text-lg">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
          value={username}
          onChange={handleUsernameChange}
        />
        <label htmlFor="password" className="text-lg">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Login
        </button>
      </form>
      <Link to="/register/" className="text-blue-500 hover:underline">
        Register
      </Link>
    </div>
  );
}
