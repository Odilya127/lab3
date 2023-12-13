import React from 'react';
import '../styles/input.scss';
const Input = ({
  type,
  label,
  value,
  name,
  placeholder,
  error,
  disabled,
  onChange,
  ...rest
}) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Input;
