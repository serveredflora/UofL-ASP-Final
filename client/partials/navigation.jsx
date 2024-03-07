import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/20/solid";
import IconText from "../components/icon_text.jsx";
import { useUser } from "../context/UserContext.jsx";

// Assuming NavigationTemplate is part of this file and not imported from elsewhere
function NavigationTemplate({ navigationData }) {
  const { updateUserState } = useUser();

  const navigate = useNavigate();
  const { user, setUser } = useUser();
  // const isLoggedIn = Boolean(localStorage.getItem("userToken"));

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    // setUser({ isLoggedIn: false, role: "" });
    updateUserState();

    navigate("/login");
  };

  return (
    <div className="flex flex-row justify-end space-x-8 adaptive-margin mt-8 -mb-8">
      <Link to="/" className="mr-auto -mt-3 rounded-2xl">
        <img
          src="https://placehold.co/144x48/DEEFEC/154752/svg"
          alt="Logo"
          className="rounded-2xl"
        />
      </Link>
      {navigationData.map((option) => (
        <NavLink
          key={option.key}
          to={option.url}
          className={({ isActive }) => "h-6 hidden md:block" + (isActive ? " nav-active" : "")}
        >
          <IconText data={option} />
        </NavLink>
      ))}
      {user.isLoggedIn && (
        <button onClick={handleLogout} className="logout-button -mt-3 md:block">
          Logout
        </button>
      )}
      <button onClick={() => {}} className="button w-12 h-12 -mt-3 md:hidden">
        ::
      </button>
    </div>
  );
}

export default function Navigation() {
  const { user } = useUser(); // Use context to access user state

  let navigationData = [
    { key: "home", text: "Home", url: "/" },
    { key: "content_index", text: "Content Index", url: "/content/" },
    { key: "about", text: "About", url: "/about/" },
    {
      key: "account",
      text: "Account",
      url: "/account/",
      icon: { Component: UserIcon, includeText: false },
    },
  ];

  if (user.role === "member") {
    const createPostsItem = {
      key: "create_posts",
      text: "Create Posts",
      url: "/posts/create/",
    };
    const insertPosition = navigationData.length - 1;
    navigationData.splice(insertPosition, 0, createPostsItem);
  }

  return <NavigationTemplate navigationData={navigationData} />;
}
