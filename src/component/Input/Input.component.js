import React from "react";
import './Input.scss'

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      className="search__input__box"
      placeholder={placeholder}
      value={value}
      onChange={e => {
        onChange(e)
      }}
    />
  );
};

export default Input