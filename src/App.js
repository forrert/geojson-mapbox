import React, { Component } from "react";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, NavbarBrand, Container } from "reactstrap";

import Routes from "./Routes";
import store from "./store";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Provider store={store}>
                    <div>
                        <Navbar color="faded">
                            <NavbarBrand>Mapbox GeoJSON</NavbarBrand>
                        </Navbar>
                        <Container fluid>
                            <Routes />
                        </Container>
                    </div>
                </Provider>
            </div>
        );
    }
}

export default App;
