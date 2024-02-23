import { Link } from "react-router-dom";
import Dropdown from "../components/dropdown.jsx";
import { generateFakeDatabaseResults, randIntRange } from "../temp.js";

let filterDropdowns = [
  {
    key: "type",
    text: "Content Type",
    allowMultipleSelections: true,
    selection: ["app", "article"],
    options: [
      { key: "app", text: "App" },
      { key: "article", text: "Articles" },
      { key: "video", text: "Video" },
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

let fakeDatabaseResults = generateFakeDatabaseResults(randIntRange(5, 12));

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

// TODO(noah): make card grid a generic component with argument/prop component for card overlay content
//             then replace this + homepage card grid with it...
function CardGrid({ data }) {
  return (
    <div className="flex flex-col space-y-8 adaptive-margin">
      <h2>Matches</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 content-center items-center place-content-center place-items-center md:mx-auto">
        {data.map((data) => (
          <div
            key={data.name}
            className="relative overflow-hidden w-full h-96 md:w-72 md:h-[40rem] rounded-2xl"
          >
            {/* TODO(noah): somehow center img */}
            <img src={data.imgSrc} className="w-full object-center object-cover"></img>
            <div className="absolute flex flex-col w-full h-1/2 top-1/2 left-0 p-4 space-y-2 justify-around items-center text-center bg-teal bg-opacity-75 text-teal-light">
              <div className="bg-teal-light px-2 py-1 rounded-full capitalize text-sm text-teal text-opacity-75">
                {data.type}
              </div>
              <h2 className="capitalize">{data.name}</h2>
              <p>{data.summary}</p>
              <div className="flex flex-row flex-wrap justify-center space-x-2 text-teal-light text-opacity-75">
                <p>Tags: </p>
                {data.tags.map((tag, index) => (
                  <p>{index != data.tags.length - 1 ? tag + "," : tag}</p>
                ))}
              </div>
              <Link to={data.url} className="button w-max">
                Visit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ContentIndex({}) {
  return (
    <div className="flex flex-col space-y-16">
      <Filters />
      <CardGrid data={fakeDatabaseResults} />
    </div>
  );
}
