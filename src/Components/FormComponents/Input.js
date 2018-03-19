import React from "react";

const Input = ({ onChange, value, id, placeholder }) => (
    <input
        onChange={e => onChange(e.target.value)}
        value={value || ""}
        id={id}
        placeholder={placeholder}
        className="form-control"
    />
);

export default Input;
