import React from "react";
import PropTypes from "prop-types";

const Button = ({ type, label, size, onClick }) => (
  <button
    className={`button flex items-center justify-center rounded-md bg-primary-600 text-white font-semibold  ${size === "lg" ? "px-4 py-3 text-body-md" : "px-4 py-2.5 text-body-sm"
      }`}
    type={type}
    onClick={onClick}>
    {label}
  </button>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
