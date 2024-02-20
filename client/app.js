import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Partials
import Navigation from "./partials/navigation.jsx";
import Footer from "./partials/footer.jsx";
// Pages
import Home from "./pages/home.jsx";
import Account from "./pages/account.jsx";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <div className="flex flex-col space-y-16 my-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
