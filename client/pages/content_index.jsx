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
import { filters } from "../config/content_index_filters.jsx";

let paginationData = {
  currentPage: 1,
  maxPages: 15,
  optionsRange: 2,
};

let fakeDatabaseResults = generateFakeDatabaseResults(randIntRange(5, 12));

let searchParams;
let setSearchParams;

let todayDate = new Date();
export let todayInDays = dateStringInDays(
  `${todayDate.getFullYear()}-${todayDate.getMonth()}-${todayDate.getDate()}`
);

function updateSearchParams(_e) {
  let params = {};

  params["page"] = paginationData.currentPage;

  Object.keys(filters).forEach((key) => {
    let filter = filters[key];
    if (filter.allowMultipleSelections) {
      params[key] = filter.selection.join(",");
    } else {
      params[key] = filter.selection;
    }
  });

  setSearchParams(params);
}

function Filters({}) {
  // TODO(noah): only allow one dropdown to be open at a time?
  return (
    <div className="flex flex-col space-y-8 adaptive-margin">
      <h2>Filters</h2>
      <form className="flex flex-row flex-wrap gap-4" onSubmit={(e) => e.preventDefault()}>
        {Object.keys(filters).map((key) => {
          let filter = filters[key];
          if ("activeCheck" in filter && !filter.activeCheck(filters)) {
            return;
          }

          return <Dropdown key={key} data={filters[key]} onChangeEvent={updateSearchParams} />;
        })}
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
  const filterKeys = Object.keys(filters);
  filterKeys.forEach((key) => {
    let filter = filters[key];
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
      let filter = filters[key];
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
