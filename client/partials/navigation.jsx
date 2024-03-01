import { Link, NavLink } from "react-router-dom";
import { UserIcon } from "@heroicons/react/20/solid";

const navigation = [
  { name: "Home", url: "/" },
  { name: "Content Index", url: "/content/" },
  // { name: "Events", url: "/events/" },
  // { name: "Blogs", url: "/blogs/" },
  // { name: "Apps", url: "/apps/" },
  { name: "About", url: "/about/" },
  { name: "Account", url: "/account/", Icon: UserIcon },
];

// TODO(noah): make the navigation bar sticky to the viewport

function NavigationTemplate({ navigationData }) {
  return (
    <div className="flex flex-row justify-end space-x-8 adaptive-margin mt-8 -mb-8">
      {/* TODO(noah): replace placeholder with logo */}
      <Link to="/" className="mr-auto -mt-3 rounded-2xl">
        <img src="https://placehold.co/144x48/DEEFEC/154752/svg" className="rounded-2xl"></img>
      </Link>
      {navigationData.map((option) => (
        <NavLink
          key={option.name}
          to={option.url}
          className={({ isActive }) => "h-6 hidden md:block" + (isActive ? " nav-active" : "")}
        >
          {() => {
            if ("Icon" in option) {
              let Icon = option.Icon;
              return <Icon className="w-5 h-5 mt-0.5"></Icon>;
            } else {
              return option.name;
            }
          }}
        </NavLink>
      ))}
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
