import { Link, useSearchParams } from "react-router-dom";
import Dropdown from "../components/dropdown.jsx";
import CardGrid from "../components/card_grid.jsx";
import Pagination from "../components/pagination.jsx";
import { generateFakeDatabaseResults, randIntRange, dateStringInDays } from "../temp.js";
import {
  DevicePhoneMobileIcon,
  NewspaperIcon,
  VideoCameraIcon,
  CalendarIcon,
} from "@heroicons/react/20/solid";
import IconText from "../components/icon_text.jsx";

// TODO(noah): add more filters!
// TODO(noah): add different dropdown options

let filterDropdowns = {
  type: {
    text: "Content Type",
    allowMultipleSelections: true, // whether to use a radio-button (allowing on one selection)
    selection: ["app", "article", "video", "event"], // holds current selection of the filter (changes based on UI + URL search params)
    options: [
      {
        key: "app",
        text: "App",
        icon: { Component: DevicePhoneMobileIcon, includeText: true },
      },
      {
        key: "article",
        text: "Articles",
        icon: { Component: NewspaperIcon, includeText: true },
      },
      {
        key: "video",
        text: "Video",
        icon: { Component: VideoCameraIcon, includeText: true },
      },
      {
        key: "event",
        text: "Event",
        icon: { Component: CalendarIcon, includeText: true },
      },
    ],
    applyToEntry: (entry, selection) => {
      return selection.includes(entry.type);
    },
  },
  publish_age: {
    key: "publish_age",
    text: "Published Date",
    allowMultipleSelections: false,
    selection: "all",
    options: [
      { key: "last_week", text: "Last Week" },
      { key: "last_month", text: "Last Month" },
      { key: "last_3_months", text: "Last 3 Months" },
      { key: "last_year", text: "Last Year" },
      { key: "last_2_years", text: "Last 2 Years" },
      { key: "all", text: "Everything" },
    ],
    applyToEntry: (entry, selection) => {
      const SELECTION_RANGES_IN_DAYS = {
        last_week: 7,
        last_month: 30,
        last_3_months: 90,
        last_year: 365,
        last_2_years: 730,
        all: 999999,
      };

      return (
        todayInDays - dateStringInDays(entry.publishDate) <= SELECTION_RANGES_IN_DAYS[selection]
      );
    },
  },
  // [type-agnostic] language
  // [type-agnostic] pricing
  // [app] platforms
  // [app] pricing models
  // [article] publisher type
  // [article] reading time
  // [event] entry price
  // [event] start date
  // [event] participant limit
  // [event] location distance
  // [event] format
  // [event] type
  // [video] platforms
  // [video] types
  // [video] pricing models
};

let paginationData = {
  currentPage: 1,
  maxPages: 15,
  optionsRange: 2,
};

let fakeDatabaseResults = generateFakeDatabaseResults(randIntRange(5, 12));

let searchParams;
let setSearchParams;

let todayDate = new Date();
let todayInDays = dateStringInDays(
  `${todayDate.getFullYear()}-${todayDate.getMonth()}-${todayDate.getDate()}`
);

function updateSearchParams(_e) {
  let params = {};

  params["page"] = paginationData.currentPage;

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
          <Dropdown key={key} data={filterDropdowns[key]} onChangeEvent={updateSearchParams} />
        ))}
      </form>
    </div>
  );
}

function ContentDetail({ data }) {
  // TODO(noah): change card details based on content type
  let typeIcon;
  let typeSpecific;
  switch (data.type) {
    case "app":
      typeIcon = (
        <IconText
          data={{ text: "App", icon: { Component: DevicePhoneMobileIcon, includeText: true } }}
        />
      );
      typeSpecific = (
        <div className="flex flex-col !my-4">
          <p className="capitalize">Platforms: {data.typeData.platforms.join(", ")}</p>
        </div>
      );
      break;
    case "article":
      typeIcon = (
        <IconText
          data={{ text: "Article", icon: { Component: NewspaperIcon, includeText: true } }}
        />
      );
      break;
    case "event":
      typeIcon = (
        <IconText
          data={{ text: "Event", icon: { Component: CalendarIcon, includeText: true } }}
        />
      );
      break;
    case "video":
      typeIcon = (
        <IconText
          data={{ text: "Video", icon: { Component: VideoCameraIcon, includeText: true } }}
        />
      );
      break;
  }

  return (
    <div className="flex flex-col space-y-2 w-full h-full">
      <div className="flex flex-row justify-between">
        <div className="bg-teal-light px-2 py-1 rounded-full capitalize text-teal">
          {typeIcon}
        </div>
        <p className="my-auto text-teal-mid">Published: {data.publishDate}</p>
      </div>
      <h3 className="capitalize">{data.name}</h3>
      <p>{data.summary}</p>
      {typeSpecific}
      <div className="flex flex-col space-y-2 !mt-auto">
        <div className="flex flex-row flex-wrap justify-center space-x-2">
          <p className="text-teal-mid">Tags: </p>
          {data.tags.map((tag, index) => (
            // TODO(noah): make clickable to (append or set) tag as a filter option...
            <p key={tag} className="underline">
              #{index != data.tags.length - 1 ? tag + "," : tag}
            </p>
          ))}
        </div>
        <div className="flex flex-row space-x-4 self-center">
          <Link to={`/content/${data.id}/`} className="button button-subtle w-max">
            View Details
          </Link>
          <Link to={data.url} className="self-center button button-light w-max">
            Visit
          </Link>
        </div>
      </div>
    </div>
  );
}

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

  let pageValueFromSearchParams = searchParams.get("page");
  if (pageValueFromSearchParams != null) {
    paginationData.currentPage = Number(pageValueFromSearchParams);
  }

  // TODO(noah): somehow apply filter to search params in URL on first page load/render
  //             this might help: https://stackoverflow.com/a/71913925

  return (
    <div className="flex flex-col space-y-16">
      <Filters />
      <CardGrid
        title={`Found Entries (Page ${paginationData.currentPage})`}
        data={filtersData}
        DetailComponent={ContentDetail}
      />
      <Pagination data={paginationData} onChangeEvent={updateSearchParams}></Pagination>
    </div>
  );
}
