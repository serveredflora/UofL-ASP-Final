import { Link, NavLink } from "react-router-dom";

const navigation = [
  { name: "Home", url: "/" },
  { name: "Content Index", url: "/content/" },
  // { name: "Events", url: "/events/" },
  // { name: "Blogs", url: "/blogs/" },
  // { name: "Apps", url: "/apps/" },
  { name: "About", url: "/about/" },
  // TODO(noah): make this show an icon instead of text
  { name: "Account", url: "/account" },
];

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
          {option.name}
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
