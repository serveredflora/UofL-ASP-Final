import { Link } from "react-router-dom";

const footer = [
  {
    text: "Column 1",
    elements: [
      {
        text: "Home",
        url: "/",
      },
      {
        text: "About",
        url: "/about/",
      },
    ],
  },
  {
    text: "Column 2",
    elements: [
      {
        text: "Contact",
        url: "/contact/",
      },
    ],
  },
];

function FooterTemp({ footerData }) {
  return (
    // <div className="mt-auto">
    <div className="bg-teal text-teal-light mt-auto">
      <div className="flex flex-row space-x-8 justify-center my-8 mx-16">
        {footerData.map((column) => (
          <div key={column.text} className="flex flex-col space-y-2">
            <h3>{column.text}</h3>
            {column.elements.map((element) => (
              <Link key={element.text} to={element.url}>
                {element.text}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
}

export default function Footer({}) {
  return <FooterTemp footerData={footer} />;
}
