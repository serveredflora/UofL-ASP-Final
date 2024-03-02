import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/20/solid";
import IconText from "../components/icon_text.jsx";

const navigation = [
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

// TODO(noah): make the navigation bar sticky to the viewport

function NavigationTemplate({ navigationData }) {
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem("userToken"));

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div className="flex flex-row justify-end space-x-8 adaptive-margin mt-8 -mb-8">
      {/* TODO(noah): replace placeholder with logo */}
      <Link to="/" className="mr-auto -mt-3 rounded-2xl">
        <img src="https://placehold.co/144x48/DEEFEC/154752/svg" className="rounded-2xl"></img>
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
      {isLoggedIn && (
        <button onClick={handleLogout} className="logout-button -mt-3 md:block">
          Logout
        </button>
      )}
      <button
        onClick={() => {
          // TODO(noah): toggle vertical dropdown list for mobile navigation
        }}
        className="button w-12 h-12 -mt-3 md:hidden"
      >
        ::
      </button>
    </div>
  );
}

export default function Navigation() {
  return <NavigationTemplate navigationData={navigation} />;
}
