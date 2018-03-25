import React from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";
import map from "lodash/map";
import pick from "lodash/pick";
import { withRouter } from "react-router-dom";
import Octicon from "react-component-octicons";

import DataSourceActions from "./DataSourceActions";

const DataSourceItem = withRouter(({ history, label, id, color }) => (
    <ListGroupItem>
        <span
            onClick={() => history.push(`/DataSources/${id}`)}
            style={{ cursor: "pointer" }}
        >
            <span
                style={{
                    padding: 5,
                    backgroundColor: color,
                    borderRadius: 5,
                    textAlign: "center"
                }}
            >
                <Octicon
                    style={{ color: "white", width: 16 }}
                    name="location"
                />
            </span>
            &nbsp;
            {label}
        </span>
        <DataSourceActions id={id} />
    </ListGroupItem>
));

const DataSourceList = props => (
    <ListGroup>
        {map(props.dataSources, ds => <DataSourceItem key={ds.id} {...ds} />)}
    </ListGroup>
);

const mapStateToProps = state => pick(state, "dataSources");

export default connect(mapStateToProps)(DataSourceList);
