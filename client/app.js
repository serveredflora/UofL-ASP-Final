import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Partials
import Navigation from "./partials/navigation.jsx";
import Footer from "./partials/footer.jsx";
// Pages
import Home from "./pages/home.jsx";
import ContentIndex from "./pages/content_index.jsx";
import Account from "./pages/account.jsx";
import Register from "./pages/register.jsx";
import PageNotFound from "./pages/page_not_found.jsx";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <div className="flex flex-col space-y-16 my-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/content/" element={<ContentIndex />} />
            {/* TODO: below should be used for viewing specific content entry in more detail */}
            {/*       `pageId` is what data should be grabbed from server */}
            {/*       doc info: https://reactrouter.com/en/main/route/route#path */}
            {/* <Route path="/content/:pageId/" element={<ContentDetail />} /> */}
            <Route path="/account/" element={<Account />} />
            <Route path="/register/" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
