import React from 'react';

// This component renders select options from an array or object
const SelectOptions = ({ name, value, onChange, options, defaultOption }) => (
  <select name={name} id={name} value={value} onChange={onChange} required>
    <option value="">{defaultOption}</option>
    {Object.entries(options).map(([optionValue, optionLabel]) => (
      <option key={optionValue} value={optionValue}>
        {optionLabel}
      </option>
    ))}
  </select>
);

export default SelectOptions;
