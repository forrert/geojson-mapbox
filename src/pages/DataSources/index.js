import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import DataSourceList from "./DataSourceList";
import ClearApiTokenButton from "../../Components/ClearApiTokenButton";

const DataSources = props => (
    <div style={{ height: "100%" }}>
        <h3>Data Sources</h3>
        <DataSourceList />
        <div style={{ paddingTop: "5px" }}>
            <Link to="/DataSources/New">
                <Button outline color="primary">
                    Add
                </Button>
            </Link>
        </div>
        <div style={{ bottom: 5, right: 0, position: "absolute" }}>
            <div className="float-right">
                <ClearApiTokenButton />
            </div>
        </div>
    </div>
);

export default DataSources;
