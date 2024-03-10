import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, RouterProvider, Routes, Outlet, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
// Partials
import Navigation from "./partials/navigation.jsx";
import Footer from "./partials/footer.jsx";
// Pages
import Home from "./pages/home.jsx";
import ContentIndex from "./pages/content_index.jsx";
import ContentPostSubmission from "./pages/content_post_submission.jsx";
import ContentSuggestForm from "./pages/content_suggest_form.jsx";
import Account from "./pages/account.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import PageNotFound from "./pages/page_not_found.jsx";

// Guard
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Components
import OnlyGuestUsers from "./components/OnlyGuestUsers.jsx";

// Debug
import Debug from "./pages/debug_page.jsx";

function PageTemplate({}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <div className="flex flex-col space-y-16 my-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

function App({}) {
  let routes = createRoutesFromElements(
    <Route element={<PageTemplate />}>
      <Route path="/" element={<Home />} />
      <Route path="/content/" element={<ContentIndex />} />
      <Route path="/account/" element={<Account />} />
      <Route path="/login/" element={<Login />} />
      <Route path="/debug/" element={<Debug />} />

      <Route
        path="/posts/create/"
        element={
          <ProtectedRoute>
            <ContentPostSubmission />
          </ProtectedRoute>
        }
      />
      <Route path="/posts/suggest/" element={<ContentSuggestForm />} />
      <Route
        path="/register/"
        element={
          <OnlyGuestUsers>
            <Register />
          </OnlyGuestUsers>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  );

  return (
    <UserProvider>
      <RouterProvider router={createBrowserRouter(routes)} />
    </UserProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
