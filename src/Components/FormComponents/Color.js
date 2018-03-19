import React, { Component } from "react";
import { CirclePicker } from "react-color";
import Dimensions from "react-dimensions";

class ColorPicker extends Component {
    render() {
        const { value, onChange, componentWidth } = this.props;
        return (
            <CirclePicker
                color={value}
                onChangeComplete={c => onChange(c.hex)}
                width={"" + componentWidth}
                circleSpacing={5}
                circleSize={18}
            />
        );
    }
}

export default Dimensions()(ColorPicker);
