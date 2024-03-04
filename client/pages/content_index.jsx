import { Suspense, useEffect, useState } from "react";
import { Link, useLoaderData, useSearchParams, useNavigate } from "react-router-dom";
import Dropdown from "../components/dropdown.jsx";
import CardGrid from "../components/card_grid.jsx";
import Pagination from "../components/pagination.jsx";
import {
  DevicePhoneMobileIcon,
  NewspaperIcon,
  VideoCameraIcon,
  CalendarIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import IconText from "../components/icon_text.jsx";
import { filters } from "../config/content_index_filters.js";
import { dateStringInDays, dateToString } from "../utils.js";

let paginationData = {
  currentPage: 1,
  maxPages: 15,
  optionsRange: 2,
};

let searchParams;
let setSearchParams;

let navigate;

let todayDate = new Date();
export let todayInDays = dateStringInDays(
  `${todayDate.getFullYear()}-${todayDate.getMonth()}-${todayDate.getDate()}`
);

function updateSearchParams(_e) {
  let params = {
    page: paginationData.currentPage,
  };

  Object.keys(filters).forEach((category_key) => {
    let filterCategory = filters[category_key];
    if ("activeCheck" in filterCategory && !filterCategory.activeCheck(filters)) {
      return;
    }

    Object.keys(filterCategory.filters).forEach((key) => {
      let filter = filterCategory.filters[key];
      if ("activeCheck" in filter && !filter.activeCheck(filters)) {
        return;
      }

      if (filter.allowMultipleSelections) {
        params[key] = filter.selection.join(",");
      } else {
        params[key] = filter.selection;
      }
    });
  });

  setSearchParams(params);
}

function Filters({}) {
  // TODO(noah): only allow one dropdown to be open at a time?
  let [categoriesExpand, setCategoriesExpand] = useState(false);

  let expandDetail;
  if (!categoriesExpand) {
    expandDetail = (
      <div className="flex flex-row space-x-2">
        <ChevronDownIcon className="w-5 h-5" />
        <p>Expand</p>
        <ChevronDownIcon className="w-5 h-5" />
      </div>
    );
  } else {
    expandDetail = (
      <div className="flex flex-row space-x-2">
        <ChevronUpIcon className="w-5 h-5" />
        <p>Collapse</p>
        <ChevronUpIcon className="w-5 h-5" />
      </div>
    );
  }

  let expandDivider;
  if (filters.agnostic.filters.type.selection.length > 1) {
    expandDivider = (
      <div className="flex flex-row space-x-4">
        <div className="flex-grow h-0.5 my-auto bg-teal"></div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setCategoriesExpand(!categoriesExpand);
          }}
        >
          {expandDetail}
        </button>
        <div className="flex-grow h-0.5 my-auto bg-teal"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 adaptive-margin">
      <h2>Filters</h2>
      <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
        {Object.keys(filters).map((category_key) => {
          let isAgnosticCategory = category_key == "agnostic";
          if (!isAgnosticCategory && !categoriesExpand) {
            // Skip if not expanded...
            return;
          }

          let filterCategory = filters[category_key];
          if ("activeCheck" in filterCategory && !filterCategory.activeCheck(filters)) {
            return;
          }

          return (
            <div key={category_key} className="flex flex-col space-y-2">
              <IconText data={filterCategory} />
              <div className="flex flex-row flex-wrap gap-4">
                {Object.keys(filterCategory.filters).map((key) => {
                  let filter = filterCategory.filters[key];
                  if ("activeCheck" in filter && !filter.activeCheck(filters)) {
                    return;
                  }

                  return (
                    <Dropdown key={key} data={filter} onChangeEvent={updateSearchParams} />
                  );
                })}
              </div>
            </div>
          );
        })}
      </form>
      {expandDivider}
    </div>
  );
}

function ContentDetail({ data }) {
  const iconData = {
    app: { text: "App", icon: { Component: DevicePhoneMobileIcon, includeText: true } },
    article: { text: "Article", icon: { Component: NewspaperIcon, includeText: true } },
    event: { text: "Event", icon: { Component: CalendarIcon, includeText: true } },
    video: { text: "Video", icon: { Component: VideoCameraIcon, includeText: true } },
  };

  return (
    <div className="flex flex-col space-y-2 w-full h-full">
      <div className="flex flex-row justify-between">
        <div className="bg-teal-light px-2 py-1 rounded-full capitalize text-teal">
          <IconText data={iconData[data.type]} />
        </div>
        <p className="my-auto text-teal-mid">Published: {data.publishDate}</p>
      </div>
      <h3 className="capitalize">{data.name}</h3>
      <p>{data.summary}</p>
      {/* TODO(noah): currently just listing the type data here, will eventually make this more pretty... */}
      <div className="text-[12px]">
        {Object.keys(data.typeData).map((key) => {
          return <p key={key}>{`"${key}": "${data.typeData[key]}"`}</p>;
        })}
      </div>
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

function getRequest(url, response_func) {
  return fetch(url, {
    method: "get",
    json: true,
  });
}

export default function ContentIndex({}) {
  const loaderData = useLoaderData();
  [searchParams, setSearchParams] = useSearchParams();
  navigate = useNavigate();

  // Load search params into filter
  const filterCategories = Object.keys(filters);
  filterCategories.forEach((category_key) => {
    Object.keys(filters[category_key].filters).map((key) => {
      let filter = filters[category_key].filters[key];
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
  });

  let filteredData = loaderData.data.filter((entry) => {
    for (let i = 0; i < filterCategories.length; i++) {
      let filterCategory = filters[filterCategories[i]];
      if ("activeCheck" in filterCategory && !filterCategory.activeCheck(filters)) {
        continue;
      }

      let filterKeys = Object.keys(filterCategory.filters);
      for (let j = 0; j < filterKeys.length; j++) {
        let filter = filterCategory.filters[filterKeys[j]];
        if ("activeCheck" in filter && !filter.activeCheck(filters)) {
          continue;
        }

        if (!filter.applyToEntry(entry, filter.selection)) {
          return false;
        }
      }
    }

    return true;
  });

  let pageValueFromSearchParams = searchParams.get("page");
  if (pageValueFromSearchParams != null) {
    paginationData.currentPage = Number(pageValueFromSearchParams);
  }

  paginationData.maxPages = loaderData.maxPages;

  // Source: https://stackoverflow.com/a/71913925
  // Ensure search params are applied if not yet present
  let pageIndex = searchParams.get("page");
  useEffect(() => {
    if (!pageIndex) {
      updateSearchParams(null);
    }
  }, [navigate, pageIndex]);

  if (!pageIndex) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-16">
      <Filters />
      <Suspense
        fallback={
          <div className="flex flex-col space-y-8 adaptive-margin text-center">
            <h3 className="bg-teal text-white rounded-2xl px-2 py-1">
              Loading Data from Server...
            </h3>
          </div>
        }
      >
        <CardGrid
          title={`Found Entries (Page ${paginationData.currentPage})`}
          data={filteredData}
          DetailComponent={ContentDetail}
        />
        <Pagination data={paginationData} onChangeEvent={updateSearchParams} />
      </Suspense>
    </div>
  );
}
