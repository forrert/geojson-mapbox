import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import DataSources from "./pages/DataSources";
import DataSoureDetail from "./pages/DataSources/DataSourceDetail";

const Routes = () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={DataSources} />
                <Route path="/DataSources/:id" component={DataSoureDetail} />
            </div>
        </Router>
    );
};

export default Routes;
