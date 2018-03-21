import React from "react";

const Input = ({ onChange, value, id, placeholder, className }) => (
    <input
        onChange={e => onChange(e.target.value)}
        value={value || ""}
        id={id}
        placeholder={placeholder}
        className={`form-control ${className}`}
    />
);

export default Input;
