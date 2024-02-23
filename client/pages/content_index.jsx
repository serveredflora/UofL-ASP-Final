import { Link } from "react-router-dom";
import Dropdown from "../components/dropdown.jsx";

let filterDropdowns = [
  {
    key: "content_type",
    text: "Type of Content",
    allowMultiple: true,
    options: [
      {
        key: "app",
        text: "App",
        checked: true,
      },
      {
        key: "article",
        text: "Articles/Blog Posts",
        checked: true,
      },
      {
        key: "event",
        text: "Event",
        checked: false,
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
        checked: false,
      },
      {
        key: "last_month",
        text: "Last Month",
        checked: false,
      },
      {
        key: "last_3_months",
        text: "Last 3 Months",
        checked: true,
      },
      {
        key: "last_year",
        text: "Last Year",
        checked: false,
      },
      {
        key: "all",
        text: "Everything",
        checked: false,
      },
    ],
  },
];

function Filters({}) {
  return (
    <div className="flex flex-col space-y-8 adaptive-margin">
      <h2>Filters</h2>
      <div className="flex flex-row space-x-4">
        {filterDropdowns.map((data) => (
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
