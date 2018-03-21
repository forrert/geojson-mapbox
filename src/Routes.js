import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Row, Col } from "reactstrap";

import Map from "./pages/Map";
import DataSources from "./pages/DataSources";
import DataSoureDetail from "./pages/DataSources/DataSourceDetail";
import FeatureDetail from "./pages/Features/Detail";

let basename = "";
if (process.env.NODE_ENV === "production") {
    basename = "geojson-mapbox";
}

const Routes = () => {
    return (
        <div>
            <Route exact path="/" component={DataSources} />
            <Route path="/DataSources/:id" component={DataSoureDetail} />
            <Route path="/Feature" component={FeatureDetail} />
        </div>
    );
};

const Layout = () => (
    <Router basename={basename}>
        <Row noGutters>
            <Col sm="8">
                <Map />
            </Col>
            <Col sm="4">
                <div
                    className="panel-right"
                    style={{
                        paddingLeft: "15px",
                        height: "calc(100vh - 56px)",
                        overflowY: "auto"
                    }}
                >
                    <Routes />
                </div>
            </Col>
        </Row>
    </Router>
);

export default Layout;
