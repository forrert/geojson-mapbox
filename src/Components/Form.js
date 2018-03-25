import React from "react";
import { Form, FormGroup, Label } from "reactstrap";
import partial from "lodash/partial";
import get from "lodash/get";

import Input from "./FormComponents/Input";
import GeoJson from "./FormComponents/GeoJson";
import Color from "./FormComponents/Color";
import DropDown from "./FormComponents/DropDown";
import Checkbox from "./FormComponents/Checkbox";

const types = {
    string: Input,
    geoJson: GeoJson,
    color: Color,
    select: DropDown,
    bool: Checkbox
};

const Field = ({ label, prop, type, ...props }) => {
    const FormComponent = types[type];
    return (
        <FormGroup>
            <Label for={prop}>{label || prop}</Label>
            <FormComponent {...props} />
        </FormGroup>
    );
};

const FormComponent = ({ onChange, fields, record, inline, className }) => (
    <Form inline={inline}>
        {fields
            .filter(f => !f.visible || f.visible(record))
            .map(f => (
                <Field
                    {...f}
                    key={f.prop}
                    onChange={partial(onChange, f.prop)}
                    value={get(record, f.prop)}
                    className={className}
                />
            ))}
    </Form>
);

export default FormComponent;
