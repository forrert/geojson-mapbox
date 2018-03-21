import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import DataSources from "./pages/DataSources";
import DataSoureDetail from "./pages/DataSources/DataSourceDetail";

let basename = "";
if (process.env.NODE_ENV === "production") {
    basename = "geojson-mapbox";
}

const Routes = () => {
    return (
        <Router basename={basename}>
            <div>
                <Route exact path="/" component={DataSources} />
                <Route path="/DataSources/:id" component={DataSoureDetail} />
            </div>
        </Router>
    );
};

export default Routes;
