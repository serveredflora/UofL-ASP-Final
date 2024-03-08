import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/20/solid";

export default function Pagination({ currentPage = 1, maxPages = 1, onChange, optionsRange = 2 }) {
  const updatePageIndex = (e, index) => {
    e.preventDefault();
    if (currentPage === index) {
      return;
    }
    onChange(index);
  };

  let buttons = [];
  buttons.push(
    <button
      key="first"
      onClick={(e) => updatePageIndex(e, 1)}
      className="button button-light p-2 w-12 h-12 leading-8"
    >
      <ChevronDoubleLeftIcon className="m-1.5 w-5 h-5" />
    </button>
  );

  const maxDiff = maxPages - optionsRange;
  const optionsStartIndex = Math.max(
    maxDiff <= currentPage
      ? currentPage - optionsRange - (currentPage - maxDiff)
      : currentPage - optionsRange,
    1
  );
  const optionsEndIndex = Math.min(optionsStartIndex + optionsRange * 2, maxPages);

  for (let i = optionsStartIndex; i <= optionsEndIndex; i++) {
    buttons.push(
      <button
        key={i}
        onClick={(e) => updatePageIndex(e, i)}
        className={`button w-12 h-12 leading-8 ${i !== currentPage ? "button-light" : ""} ${
          Math.abs(i - currentPage) >= 2 ? "hidden md:block" : ""
        }`}
      >
        {i}
      </button>
    );
  }

  buttons.push(
    <button
      key="last"
      onClick={(e) => updatePageIndex(e, maxPages)}
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
