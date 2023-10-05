import React from "react";
import PropTypes from "prop-types";

const Input = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-600 text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        className="border p-2 w-full"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    size: PropTypes.string,
    onChange: PropTypes.func
  };

export default Input;
