import React from "react";
import CodeMirror from "react-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";

const options = {
    lineNumbers: true,
    mode: "application/json",
    smartIndent: true
};

export default ({ value, onChange }) => (
    <CodeMirror value={value} onChange={onChange} options={options} />
);
