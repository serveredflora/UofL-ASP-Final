import { Link, useSearchParams } from "react-router-dom";
import Dropdown from "../components/dropdown.jsx";
import { generateFakeDatabaseResults, randIntRange } from "../temp.js";

let filterDropdowns = {
  type: {
    text: "Content Type",
    allowMultipleSelections: true,
    selection: ["app", "article"],
    options: [
      { key: "app", text: "App" },
      { key: "article", text: "Articles" },
      { key: "video", text: "Video" },
      { key: "event", text: "Event" },
    ],
    applyToEntry: (entry, selection) => {
      return selection.includes(entry.type);
    },
  },
  publish_age: {
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
    applyToEntry: (entry, selection) => {
      // TODO(noah): do this filter...
      return true;
    },
  },
};

let fakeDatabaseResults = generateFakeDatabaseResults(randIntRange(5, 12));

let searchParams;
let setSearchParams;

function submitFilters(_e) {
  let params = {};
  Object.keys(filterDropdowns).forEach((key) => {
    let filter = filterDropdowns[key];
    if (filter.allowMultipleSelections) {
      params[key] = filter.selection.join(",");
    } else {
      params[key] = filter.selection;
    }
  });

  setSearchParams(params);
}

function Filters({}) {
  return (
    <div className="flex flex-col space-y-8 adaptive-margin">
      <h2>Filters</h2>
      <form className="flex flex-row space-x-4" onSubmit={(e) => e.preventDefault()}>
        {Object.keys(filterDropdowns).map((key) => (
          <Dropdown key={key} data={filterDropdowns[key]} onChangeEvent={submitFilters} />
        ))}
      </form>
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
        {data.map((entry) => (
          <div
            key={entry.name}
            className="relative overflow-hidden w-full h-96 md:w-72 md:h-[40rem] rounded-2xl"
          >
            {/* TODO(noah): somehow center img */}
            <img src={entry.imgSrc} className="w-full object-center object-cover"></img>
            <div className="absolute flex flex-col w-full h-1/2 top-1/2 left-0 p-4 space-y-2 justify-around items-center text-center bg-teal bg-opacity-75 text-teal-light">
              <div className="bg-teal-light px-2 py-1 rounded-full capitalize text-sm text-teal text-opacity-75">
                {entry.type}
              </div>
              <h2 className="capitalize">{entry.name}</h2>
              <p>{entry.summary}</p>
              <div className="flex flex-row flex-wrap justify-center space-x-2 text-teal-light text-opacity-75">
                <p>Tags: </p>
                {entry.tags.map((tag, index) => (
                  <p key={tag}>{index != entry.tags.length - 1 ? tag + "," : tag}</p>
                ))}
              </div>
              <Link to={entry.url} className="button w-max">
                Visit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function filterByType(entry, filter) {}

export default function ContentIndex({}) {
  [searchParams, setSearchParams] = useSearchParams();

  // Load search params into filter
  const filterKeys = Object.keys(filterDropdowns);
  filterKeys.forEach((key) => {
    let filter = filterDropdowns[key];
    let value = searchParams.get(key);

    if (value == null) {
      return;
    }

    if (filter.allowMultipleSelections) {
      filter.selection = value.split(",");
    } else {
      filter.selection = value;
    }
  });

  let filtersData = fakeDatabaseResults.filter((entry) => {
    for (let i = 0; i < filterKeys.length; i++) {
      let key = filterKeys[i];
      let filter = filterDropdowns[key];
      if (!filter.applyToEntry(entry, filter.selection)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="flex flex-col space-y-16">
      <Filters />
      <CardGrid data={filtersData} />
    </div>
  );
}
