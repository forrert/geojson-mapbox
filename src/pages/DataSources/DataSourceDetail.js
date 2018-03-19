import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";

import FormComponent from "../../Components/Form";
import { addDataSource, updateDataSource } from "../../actions/dataSources";

const fields = [
    {
        prop: "label",
        label: "Label",
        type: "string"
    },
    {
        prop: "color",
        label: "Color",
        type: "color"
    },
    {
        prop: "geoJson",
        label: "Data",
        type: "geoJson"
    }
];

class DataSourceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h3>Data Source</h3>
                <Button outline color="primary" onClick={this.onSave}>
                    Save
                </Button>
                <FormComponent
                    fields={fields}
                    record={this.getRecord()}
                    onChange={this.onChange}
                />
            </div>
        );
    }

    onChange = (prop, value) => {
        this.setState({ [prop]: value });
    };

    getRecord() {
        const { record } = this.props;
        return {
            ...record,
            ...this.state
        };
    }

    onSave = () => {
        const { id, addDataSource, updateDataSource, history } = this.props;
        const record = this.getRecord();
        if (id === "New") {
            addDataSource(record);
        } else {
            updateDataSource(record);
        }
        history.push("/");
    };
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    if (id === "New") {
        return { record: { label: "New Layer", geoJson: "{}" }, id };
    }
    const record = state.dataSources[id];
    return {
        record: { ...record, geoJson: JSON.stringify(record.geoJson, null, 2) }
    };
};

export default connect(mapStateToProps, { addDataSource, updateDataSource })(
    withRouter(DataSourceDetail)
);
