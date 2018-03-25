import React from "react";
import PropTypes from "prop-types";

function DropDown(props) {
    const { options, onChange, value, name, className } = props;
    return (
        <select
            className={`form-control ${className}`}
            onChange={e => onChange(e.target.value)}
            value={value || ""}
            name={name}
        >
            <option disabled value="">
                Select...
            </option>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

DropDown.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            label: PropTypes.string
        })
    ),
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default DropDown;

export const option = (value, label) => ({ value, label: label || value });
