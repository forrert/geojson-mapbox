import React from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";
import map from "lodash/map";
import pick from "lodash/pick";
import { withRouter } from "react-router-dom";

const DataSourceItem = withRouter(({ history, label, id }) => (
    <ListGroupItem
        onClick={() => history.push(`/DataSources/${id}`)}
        style={{ cursor: "pointer" }}
    >
        {label}
    </ListGroupItem>
));

const DataSourceList = props => (
    <ListGroup>
        {map(props.dataSources, ds => <DataSourceItem key={ds.id} {...ds} />)}
    </ListGroup>
);

const mapStateToProps = state => pick(state, "dataSources");

export default connect(mapStateToProps)(DataSourceList);
