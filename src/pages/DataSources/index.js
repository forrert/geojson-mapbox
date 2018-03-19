import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import DataSourceList from "./DataSourceList";

const DataSources = props => (
    <div>
        <h3>Data Sources</h3>
        <DataSourceList />
        <div style={{ paddingTop: "5px" }}>
            <Link to="/DataSources/New">
                <Button outline color="primary">
                    Add
                </Button>
            </Link>
        </div>
    </div>
);

export default DataSources;
