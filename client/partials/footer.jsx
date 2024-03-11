import { Link } from "react-router-dom";

const footer = [
  {
    name: "Environmental Friendly Living",
    elements: [
      { name: "Home", url: "/" },
      { name: "Apps", url: "/apps/" },
      { name: "Blogs", url: "/blogs/" },
      { name: "Events", url: "/events/" },
      { name: "Videos", url: "/videos/" },
    ],
  },
  {
    name: "Contact",
    elements: [{ name: "About", url: "/about/" }],
  },
];

function FooterTemplate({ footerData }) {
  return (
    // <div className="mt-auto">
    <div className="bg-teal text-teal-light mt-auto">
      <div className="flex flex-row space-x-8 justify-center adaptive-margin my-8">
        {footerData.map((column) => (
          <div key={column.name} className="flex flex-col space-y-2">
            <h3>{column.name}</h3>
            {column.elements.map((element) => (
              <Link key={element.name} to={element.url}>
                {element.name}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
}

export default function Footer() {
  return <FooterTemplate footerData={footer} />;
}
