import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/20/solid";

export default function Pagination({ data, onChangeEvent }) {
  const [pageIndex, setPageIndex] = useState();
  const updatePageIndex = (e, index) => {
    if (pageIndex == index) {
      return;
    }

    console.log(index);
    data.currentPage = index;

    setPageIndex(index);

    onChangeEvent(e);
  };

  let buttons = [];
  buttons.push(
    <button
      key={0}
      onClick={(e) => updatePageIndex(e, 1)}
      className="button button-light p-2 w-12 h-12 leading-8"
    >
      <ChevronDoubleLeftIcon className="m-1.5 w-5 h-5" />
    </button>
  );

  // TODO(noah): this needs a refactor to be clearer what this is doing...
  const maxDiff = data.maxPages - data.optionsRange;
  const optionsStartIndex = Math.max(
    maxDiff <= data.currentPage
      ? data.currentPage - data.optionsRange - (data.currentPage - maxDiff)
      : data.currentPage - data.optionsRange,
    1
  );
  const optionsEndIndex = Math.min(optionsStartIndex + data.optionsRange * 2, data.maxPages);

  for (let i = optionsStartIndex; i <= optionsEndIndex; i++) {
    buttons.push(
      <button
        key={i}
        onClick={(e) => updatePageIndex(e, i)}
        className={`button w-12 h-12 leading-8 ${i != data.currentPage ? "button-light" : ""} ${
          Math.abs(i - data.currentPage) >= 2 ? "hidden md:block" : ""
        }`}
      >
        {i}
      </button>
    );
  }

  buttons.push(
    <button
      key={999}
      onClick={(e) => updatePageIndex(e, data.maxPages)}
      className="button button-light p-2 w-12 h-12 leading-8"
    >
      <ChevronDoubleRightIcon className="m-1.5 w-5 h-5" />
    </button>
  );

  return (
    <div className="flex flex-row space-x-4 adaptive-margin text-center justify-center">
      {buttons}
    </div>
  );
}
