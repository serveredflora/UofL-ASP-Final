import { Link } from "react-router-dom";

const navigation = [
  { name: "Home", url: "/" },
  { name: "Guides", url: "/guides/" },
  { name: "Blogs", url: "/blogs/" },
  { name: "Events", url: "/events/" },
  { name: "Contact", url: "/contact/" },
  { name: "Account", url: "/account" },
];

// TODO(noah): add vertical dropdown list for mobile navigation
function NavigationTemplate({ navigationData }) {
  return (
    <div className="flex flex-grow flex-row justify-end space-x-8 adaptive-margin mt-8 -mb-8">
      {navigationData.map((option) => (
        <Link key={option.name} to={option.url}>
          {option.name}
        </Link>
      ))}
    </div>
  );
}

export default function Navigation() {
  return <NavigationTemplate navigationData={navigation} />;
}
