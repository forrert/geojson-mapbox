import React from "react";
import { connect } from "react-redux";
import { ButtonGroup, Button } from "reactstrap";
import Octicon from "react-component-octicons";

import ButtonWithConfirm from "../../Components/ButtonWithConfirm";

import { updateDataSource, deleteDataSource } from "../../actions/dataSources";

const ToggleVisibilityButton = ({ dataSource, updateDataSource }) => (
    <Button
        outline
        size="sm"
        onClick={() =>
            updateDataSource({
                id: dataSource.id,
                visible: !dataSource.visible
            })
        }
        color={dataSource.visible ? "primary" : "secondary"}
    >
        <Octicon name="eye" />
    </Button>
);

const DeleteButton = ({ id, deleteDataSource }) => (
    <ButtonWithConfirm
        outline
        size="sm"
        onClick={() => deleteDataSource(id)}
        label={<Octicon name="x" />}
        title="Delete"
        color="danger"
    />
);

const DataSourceActions = ({
    dataSource,
    updateDataSource,
    deleteDataSource,
    id
}) => (
    <ButtonGroup className="float-right" size="sm">
        <ToggleVisibilityButton
            dataSource={dataSource}
            updateDataSource={updateDataSource}
        />
        <DeleteButton id={id} deleteDataSource={deleteDataSource} />
    </ButtonGroup>
);

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps;
    return { dataSource: state.dataSources[id] };
};

export default connect(mapStateToProps, { updateDataSource, deleteDataSource })(
    DataSourceActions
);
