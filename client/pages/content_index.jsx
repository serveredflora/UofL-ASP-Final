import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
import { dateStringInDays, dateToString, todayInDays } from "../utils";

export default function ContentIndex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [contentData, setContentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [maxPages, setMaxPages] = useState(0);

  useEffect(() => {
    const fetchContentData = async (page) => {
      try {
        const response = await fetch(`/generic/data/contents/page/${page}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const paginatedData = await response.json();
        setContentData(paginatedData.data);
        setCurrentPage(paginatedData.currentPage);
        setMaxPages(paginatedData.maxPages);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

    fetchContentData(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString() });
  };

  const updateSearchParams = (newFilters) => {
    setSearchParams(newFilters);
  };

  return (
    <div className="flex flex-col space-y-16">
      <Filters updateSearchParams={updateSearchParams} />
      <CardGrid
        title={`Found Entries (Page ${currentPage})`}
        data={contentData}
        DetailComponent={ContentDetail}
      />
      <Pagination currentPage={currentPage} maxPages={maxPages} onChange={handlePageChange} />
    </div>
  );
}

function Filters({ updateSearchParams }) {
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
  return data ? (
    <div className="flex flex-col space-y-2 w-full h-full">
      <h3 className="text-lg">{data.title}</h3>
      <p>Type: {data.type}</p>
      <p>Language: {data.language}</p>
      <p>{data.description}</p>
    </div>
  ) : (
    <p>No content found.</p>
  );
}

// function ContentDetail({ data }) {
//   const iconData = {
//     app: { text: "App", icon: { Component: DevicePhoneMobileIcon, includeText: true } },
//     article: { text: "Article", icon: { Component: NewspaperIcon, includeText: true } },
//     event: { text: "Event", icon: { Component: CalendarIcon, includeText: true } },
//     video: { text: "Video", icon: { Component: VideoCameraIcon, includeText: true } },
//   };

//   return (
//     <div className="flex flex-col space-y-2 w-full h-full">
//       <div className="flex flex-row justify-between">
//         <div className="bg-teal-light px-2 py-1 rounded-full capitalize text-teal">
//           <IconText data={iconData[data.type]} />
//         </div>
//         <p className="my-auto text-teal-mid">Published: {data.publishDate}</p>
//       </div>
//       <h3 className="capitalize">{data.name}</h3>
//       <p>{data.summary}</p>
//       {/* TODO(noah): currently just listing the type data here, will eventually make this more pretty... */}
//       <div className="text-[12px]">
//         {Object.keys(data.typeData).map((key) => {
//           return <p key={key}>{`"${key}": "${data.typeData[key]}"`}</p>;
//         })}
//       </div>
//       <div className="flex flex-col space-y-2 !mt-auto">
//         <div className="flex flex-row flex-wrap justify-center space-x-2">
//           <p className="text-teal-mid">Tags: </p>
//           {data.tags.map((tag, index) => (
//             // TODO(noah): make clickable to (append or set) tag as a filter option...
//             <p key={tag} className="underline">
//               #{index != data.tags.length - 1 ? tag + "," : tag}
//             </p>
//           ))}
//         </div>
//         <div className="flex flex-row space-x-4 self-center">
//           <Link to={`/content/${data.id}/`} className="button button-subtle w-max">
//             View Details
//           </Link>
//           <Link to={data.url} className="self-center button button-light w-max">
//             Visit
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
