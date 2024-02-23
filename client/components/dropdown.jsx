function CheckboxDropdownElement({ dropdown, option }) {
  return (
    <div className="flex flex-row space-x-4">
      {/* TODO(noah): allow the option to be pre-checked... */}
      <input
        type="checkbox"
        name={option.key}
        className="my-auto rounded text-teal border-teal border-2"
      />
      <label>{option.text}</label>
    </div>
  );
}

function RadioDropdownElement({ dropdown, option }) {
  return (
    <div className="flex flex-row space-x-4">
      {/* TODO(noah): allow the option to be pre-checked... */}
      <input
        type="radio"
        name={dropdown.key}
        value={option.key}
        className="my-auto text-teal border-teal border-2"
      />
      <label>{option.text}</label>
    </div>
  );
}

function DropdownElement({ dropdown, option }) {
  if (dropdown.allowMultiple) {
    return <CheckboxDropdownElement dropdown={dropdown} option={option} />;
  } else {
    return <RadioDropdownElement dropdown={dropdown} option={option} />;
  }
}

export default function Dropdown({ data }) {
  return (
    <div className="flex flex-col space-y-2">
      {/* TODO(noah): make this dropdown collapse-able */}
      <div className="flex flex-row space-x-4 justify-between border-teal border-2 px-4 py-2 rounded-2xl">
        <p>{data.text}</p>
        {/* Icon 'chevron-down' from: https://heroicons.com/mini */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div className="flex flex-col space-y-2 border-teal border-2 px-4 py-2 rounded-2xl">
        {data.options.map((option) => (
          <DropdownElement key={option.key} dropdown={data} option={option} />
        ))}
      </div>
    </div>
  );
}
