import React from "react";
import { Form, FormGroup, Label } from "reactstrap";
import partial from "lodash/partial";

import Input from "./FormComponents/Input";
import GeoJson from "./FormComponents/GeoJson";
import Color from "./FormComponents/Color";

const types = {
    string: Input,
    geoJson: GeoJson,
    color: Color
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

const FormComponent = ({ onChange, fields, record, inline }) => (
    <Form inline={inline}>
        {fields.map(f => (
            <Field
                {...f}
                key={f.prop}
                onChange={partial(onChange, f.prop)}
                value={record[f.prop]}
            />
        ))}
    </Form>
);

export default FormComponent;
