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
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex flex-col space-y-2 border-teal border-2 px-4 py-2 rounded-2xl">
        {data.options.map((option) => (
          <div key={option.key} className="flex flex-row space-x-2">
            <input
              type={data.allowMultiple ? "checkbox" : "radio"}
              id={option.key}
              name={data.key}
              value={option.key}
              className="my-auto"
              defaultChecked={option.checked}
            />
            <label htmlFor={option.key}>{option.text}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
