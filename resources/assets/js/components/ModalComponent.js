import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';

class ModalComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            backdrop: true
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return(
            <div className="modal-container">
                Test
                <Button color="danger" onClick={this.toggle}> Toggle Modal</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="test-modal" backdrop={this.state.backdrop}>
                    <ModalHeader toggle={this.toggle}>Test Title</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default ModalComponent;