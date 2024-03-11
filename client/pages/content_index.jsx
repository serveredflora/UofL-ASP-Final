import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Dropdown from "../components/dropdown.jsx";
import CardGrid from "../components/card_grid.jsx";
import Pagination from "../components/pagination.jsx";
import { DevicePhoneMobileIcon, NewspaperIcon, VideoCameraIcon, CalendarIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import IconText from "../components/icon_text.jsx";
import { filters } from "../config/content_index_filters.js";
import { dateStringInDays, dateToString, todayInDays } from "../utils";

export default function ContentIndex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [contentData, setContentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [maxPages, setMaxPages] = useState(0);

  // Load search params state into filter
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

  const handlePageChange = (newPage) => {
    let params = Object.fromEntries(searchParams);
    params.page = newPage.toString();
    setCurrentPage(newPage);
    setSearchParams(params);
  };

  const handleFilterChange = (_e) => {
    updateSearchParams(searchParams, setSearchParams);
  };

  useEffect(() => {
    const fetchContentData = async (page) => {
      try {
        const response = await fetch(`/generic/data/contents/page/${page}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const paginatedData = await response.json();
        setContentData(paginatedData.data);
        setCurrentPage(paginatedData.currentPage);
        setMaxPages(paginatedData.maxPages);
        updateSearchParams(searchParams, setSearchParams);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

    fetchContentData(currentPage);
  }, [currentPage]);

  let filteredContentData = applyFiltersToContentData(contentData);

  return (
    <div className="flex flex-col space-y-16">
      <Filters onChange={handleFilterChange} />
      <CardGrid title={`Found Entries (Page ${currentPage})`} data={filteredContentData} DetailComponent={ContentDetail} />
      <Pagination currentPage={currentPage} maxPages={maxPages} onChange={handlePageChange} />
    </div>
  );
}

function updateSearchParams(searchParams, setSearchParams) {
  let params = {};

  // Only copy page value if it exists in the current search params
  if (searchParams.has("page")) {
    params.page = searchParams.get("page");
  } else {
    params.page = 1;
  }

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

      params[key] = filter.allowMultipleSelections ? filter.selection.join(",") : filter.selection;
    });
  });

  setSearchParams(params);
  // if (!forceDontUpdateContentData && Object.keys(contentData).length > 0) {
  //   updateContentData();
  // }
}

function applyFiltersToContentData(contentData) {
  // TODO(noah): apply filters!
  const filterCategories = Object.keys(filters);
  return contentData.filter((entry) => {
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
}

function Filters({ onChange }) {
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
  if (Object.keys(filters).length > 1 && filters.agnostic.filters.type.selection.length >= 1) {
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
    <div className="component-container-8">
      <h2>Filters</h2>
      <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
        {Object.keys(filters).map((category_key) => {
          let isAgnosticCategory = category_key == "agnostic";
          if (!isAgnosticCategory && !categoriesExpand) {
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

                  return <Dropdown key={key} data={filter} onChangeEvent={onChange} />;
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
      <div className="flex flex-row space-x-4 justify-center">
        <div className="bg-teal-light px-2 py-1 rounded-full h-min capitalize text-teal">
          <IconText data={iconData[data.type]} />
        </div>
        <h3 className="my-auto capitalize">{data.title}</h3>
      </div>
      <p className="pb-4">{data.description}</p>
      <div className="text-[12px]">
        {Object.keys(data).map((key) => {
          if (!key.includes(data.type)) {
            return;
          }
          return <p key={key}>{`"${key}": "${data[key]}"`}</p>;
        })}
      </div>
      <div className="flex flex-col space-y-2 !mt-auto">
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
