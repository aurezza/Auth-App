import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'

// For detailed information, refer to library docs at: https://reactstrap.github.io/components/modals/

const ModalItem = (props) => {
    var adjustment = {
        padding: '10px'
    };

    return (
        <div className="modal-item">
            <Modal isOpen={props.active} toggle={props.toggle} className={props.className} backdrop={true}>
                
                {!props.hasHeader ?  <div style={adjustment}></div> : 
                    <ModalHeader toggle={props.toggle}>
                        {props.title}
                    </ModalHeader>
                }

                <ModalBody>
                    {props.children}
                </ModalBody>
               
                {!props.hasFooter ? <div style={adjustment}></div> : 
                    <ModalFooter>
                        <Button color={props.closeButtonColor ? props.closeButtonColor : 'secondary'} onClick={props.toggle}>{props.closeButtonLabel ? props.closeButtonLabel : 'Close'}</Button>
                    </ModalFooter>
                }
            </Modal>
        </div>
    )
}

ModalItem.propTypes = {
    active: PropTypes.bool.isRequired,
    title: PropTypes.string,
    className: PropTypes.string,
    toggle: PropTypes.func,
    hasHeader: PropTypes.bool,
    hasFooter: PropTypes.bool,
    closeButtonLabel: PropTypes.string,
    closeButtonColor: PropTypes.string
}

ModalItem.defaultProps = {
    hasHeader: true,
    hasFooter: true
}

export default ModalItem;
