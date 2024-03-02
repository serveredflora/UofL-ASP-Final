import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role: "member" }),
      });
      if (response.ok) {
        navigate("/login", { state: { message: "Account created! Please login using your username and password." } });
      } else {
        const data = await response.json();
        setError(data.error || "An error occurred during registration");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Failed to connect to the server");
    }
  };

  return (
    <div className="flex flex-col space-y-8 items-center">
      <h2 className="font-bold">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <label htmlFor="username" className="text-lg">Username:</label>
        <input type="text" id="username" name="username" placeholder="Choose a username"
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
          value={username} onChange={handleUsernameChange} />
        <label htmlFor="password" className="text-lg">Password:</label>
        <input type="password" id="password" name="password" placeholder="Choose a password"
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
          value={password} onChange={handlePasswordChange} />
        <button type="submit"
          className="bg-blue-500 text-black px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
          Register
        </button>
      </form>
      <Link to="/login" className="text-blue-500 hover:underline">Already have an account? Log in</Link>
    </div>
  );
}
