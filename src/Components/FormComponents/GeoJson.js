import React from "react";
import CodeMirror from "react-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";

const defaultOptions = {
    lineNumbers: true,
    mode: "application/json",
    smartIndent: true
};

export default ({ value, onChange, options = {} }) => (
    <CodeMirror
        value={value}
        onChange={onChange}
        options={{ ...defaultOptions, ...options }}
    />
);
