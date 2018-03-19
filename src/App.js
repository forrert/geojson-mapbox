import React, { Component } from "react";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, NavbarBrand, Container, Row, Col } from "reactstrap";

import Routes from "./Routes";
import Map from "./pages/Map";
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
                        </Container>
                    </div>
                </Provider>
            </div>
        );
    }
}

export default App;
