import { Link } from "react-router-dom";

const navigation = [
  { name: "Home", url: "/" },
  { name: "Guides", url: "/guides/" },
  { name: "Blogs", url: "/blogs/" },
  { name: "Events", url: "/events/" },
  { name: "Contact", url: "/contact/" },
  { name: "Account", url: "/account" },
];

function NavigationTemp({ navigationData }) {
  return (
    <div className="flex flex-row justify-end space-x-8 px-8 pt-8 -mb-8">
      {navigationData.map((option) => (
        <Link key={option.name} to={option.url}>
          {option.name}
        </Link>
      ))}
    </div>
  );
}

export default function Navigation({}) {
  return <NavigationTemp navigationData={navigation} />;
}
