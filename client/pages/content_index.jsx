import { Link } from "react-router-dom";
import Dropdown from "../components/dropdown.jsx";

let filterDropdowns = [
  {
    key: "type",
    text: "Content Type",
    allowMultipleSelections: true,
    selection: ["app", "article"],
    options: [
      { key: "app", text: "App" },
      { key: "article", text: "Articles" },
      { key: "event", text: "Event" },
    ],
  },
  {
    key: "publish_age",
    text: "Published Date",
    allowMultipleSelections: false,
    selection: "last_3_months",
    options: [
      { key: "last_week", text: "Last Week" },
      { key: "last_month", text: "Last Month" },
      { key: "last_3_months", text: "Last 3 Months" },
      { key: "last_year", text: "Last Year" },
      { key: "all", text: "Everything" },
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
