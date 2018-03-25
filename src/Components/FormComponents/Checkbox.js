import React from "react";

function CheckBox(props) {
    const { onChange, value, name, className } = props;
    return (
        <div>
            <input
                className={className}
                type="checkbox"
                name={name}
                checked={value}
                onChange={e => onChange(e.target.checked)}
            />
        </div>
    );
}

export default CheckBox;
