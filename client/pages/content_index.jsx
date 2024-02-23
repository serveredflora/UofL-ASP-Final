import { Link } from "react-router-dom";
import Dropdown from "../components/dropdown.jsx";

const filtersDropdowns = [
  {
    key: "content_type",
    text: "Type of Content",
    allowMultiple: true,
    options: [
      {
        key: "app",
        text: "App",
        onClick: () => {
          console.log("...");
        },
      },
      {
        key: "article",
        text: "Articles/Blog Posts",
        onClick: () => {
          console.log("...");
        },
      },
      {
        key: "event",
        text: "Event",
        onClick: () => {
          console.log("...");
        },
      },
    ],
  },
  {
    key: "publish_age",
    text: "Published Date",
    allowMultiple: false,
    options: [
      {
        key: "last_week",
        text: "Last Week",
        onClick: () => {
          console.log("...");
        },
      },
      {
        key: "last_month",
        text: "Last Month",
        onClick: () => {
          console.log("...");
        },
      },
      {
        key: "last_3_months",
        text: "Last 3 Months",
        onClick: () => {
          console.log("...");
        },
      },
      {
        key: "last_year",
        text: "Last Year",
        onClick: () => {
          console.log("...");
        },
      },
      {
        key: "all",
        text: "Everything",
        onClick: () => {
          console.log("...");
        },
      },
    ],
  },
];

function Filters({}) {
  return (
    <div className="flex flex-col space-y-8 adaptive-margin">
      <h2>Filters</h2>
      <div className="flex flex-row space-x-4">
        {filtersDropdowns.map((data) => (
          <Dropdown key={data.key} data={data} />
        ))}
      </div>
    </div>
  );
}

export default function ContentIndex({}) {
  return (
    <div className="flex flex-col space-y-16">
      <Filters></Filters>
    </div>
  );
}
