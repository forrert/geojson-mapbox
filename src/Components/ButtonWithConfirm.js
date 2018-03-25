import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";

class ButtonWithConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false };
    }

    render() {
        const { showModal } = this.state;
        const { label, title } = this.props;
        return (
            <Button {...this.props} onClick={this.toggleModal}>
                {label}
                <Modal
                    isOpen={showModal}
                    toggle={this.toggleModal}
                    autoFocus={false}
                    fade={false}
                >
                    <ModalHeader>Confirm {title || label}</ModalHeader>
                    <ModalFooter>
                        <Button {...this.props}>{title || label}</Button>
                    </ModalFooter>
                </Modal>
            </Button>
        );
    }

    toggleModal = () =>
        this.setState(state => ({ showModal: !state.showModal }));
}

export default ButtonWithConfirm;
