import { useState } from "react";

export default function Dropdown({ data, onChangeEvent }) {
  // TODO(noah): try using 'FormData' instead of this funky react state mess...

  // Triggered when both a check or radio box is updated
  const [selection, setSelection] = useState(data.selection);
  const updateSelection = (e) => {
    // Update the selection
    let key = e.target.value;
    if (data.allowMultipleSelections) {
      if (data.selection.includes(key)) {
        data.selection = data.selection.filter((v) => {
          return v != key;
        });
      } else {
        data.selection.push(key);
      }
    } else {
      data.selection = e.target.value;
    }

    if (!data.allowMultipleSelections) {
      onChangeEvent(e);
    }

    // Update the component value
    setSelection(data.selection);
  };

  let options = data.options.map((option) => {
    const getChecked = () => {
      return data.selection.includes(option.key);
    };

    // This state value is only used for checkboxes
    const [checked, setChecked] = useState(getChecked());
    const updateChecked = (e) => {
      updateSelection(e);
      setChecked(getChecked());
      onChangeEvent(e);
    };

    return (
      <div key={option.key} className="flex flex-row space-x-2 justify-between text-right">
        {/* The input behavior is dependant on if the dropdown should allow multiple values at once */}
        <input
          type={data.allowMultipleSelections ? "checkbox" : "radio"}
          id={option.key}
          name={option.key}
          value={option.key}
          checked={data.allowMultipleSelections ? checked : selection == option.key}
          onChange={data.allowMultipleSelections ? updateChecked : updateSelection}
          className="my-auto"
        />
        <label htmlFor={option.key}>{option.text}</label>
      </div>
    );
  });

  // TODO(noah): make this container not change the page layout (like an overlay?)
  // TODO(noah): make the dropdown collapse if a click/point event occurs outside
  //             the container bounds (maybe?)
  let optionsContainer = (
    <div className="flex flex-col space-y-2 border-teal border-2 px-4 py-2 rounded-2xl">
      {options}
    </div>
  );

  const [showOptions, setShowOptions] = useState(false);
  const toggleOptionsVisibility = () => {
    setShowOptions(!showOptions);
  };

  const OptionsIcon = ({}) => {
    if (!showOptions) {
      // Icon 'chevron-down' from: https://heroicons.com/mini
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      );
    } else {
      // Icon 'chevron-up' from: https://heroicons.com/mini
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* TODO(noah): make this dropdown collapse-able */}
      <button
        onClick={toggleOptionsVisibility}
        className="flex flex-row space-x-4 justify-between border-teal border-2 px-4 py-2 rounded-2xl"
      >
        <p>{data.text}</p>
        <OptionsIcon />
      </button>
      {showOptions && optionsContainer}
    </div>
  );
}
