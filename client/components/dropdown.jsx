import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import IconText from "../components/icon_text.jsx";

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
      if (!data.allowMultipleSelections) {
        return false;
      }

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
        <IconText data={option} />
      </div>
    );
  });

  let optionsContainer = (
    <div className="absolute mt-2 flex flex-col space-y-2 z-10 bg-white bg-opacity-50 backdrop-blur w-full border-teal border-2 px-4 py-2 rounded-2xl">
      {options}
    </div>
  );

  const [showOptions, setShowOptions] = useState(false);
  const toggleOptionsVisibility = () => {
    setShowOptions(!showOptions);
  };

  const OptionsIcon = ({}) => {
    if (!showOptions) {
      return <ChevronDownIcon className="w-5 h-5" />;
    } else {
      return <ChevronUpIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="relative">
      {/* Button to allow toggling the dropdown's collapsed state */}
      <a
        onClick={toggleOptionsVisibility}
        className="flex flex-row space-x-4 justify-between border-teal border-2 px-4 py-2 rounded-2xl"
      >
        <IconText data={data} />
        <OptionsIcon />
      </a>
      {showOptions && optionsContainer}
    </div>
  );
}
