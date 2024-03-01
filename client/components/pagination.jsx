import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/20/solid";

export default function Pagination({ data, onChangeEvent }) {
  let [pageIndex, setPageIndex] = useState();

  const updatePageIndex = (e, index) => {
    data.currentPage = index;

    onChangeEvent(e);

    setPageIndex(index);
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
  const maxDiff = data.maxPages - data.directRange;
  const directPagesStart = Math.max(
    maxDiff <= data.currentPage
      ? data.currentPage - data.directRange - (data.currentPage - maxDiff)
      : data.currentPage - data.directRange,
    1
  );
  const directPagesMax = Math.min(directPagesStart + data.directRange * 2, data.maxPages);

  for (let i = directPagesStart; i <= directPagesMax; i++) {
    buttons.push(
      <button
        key={i}
        onClick={(e) => updatePageIndex(e, i)}
        className={
          "button w-12 h-12 leading-8 " +
          (i == data.currentPage ? "button-subtle" : "button-light")
        }
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
