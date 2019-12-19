import React from 'react'
import { Modal, ModalHeader, ModalFooter, Button, ModalBody } from 'reactstrap';
import IntlMessages from "../../helpers/IntlMessages";


const PromptModal = ({ isOpen, toggle, confirm }) => {
    return <Modal {...{ isOpen, toggle }}>
        <ModalHeader {...{ toggle }}>
            <IntlMessages id='prompt.warning' />
        </ModalHeader>
        <ModalBody>
            <IntlMessages id='prompt.sure' />
        </ModalBody>
        <ModalFooter>
            <Button
                color='danger'
                onClick={confirm}
            >
                <IntlMessages id='prompt.confirm' />
            </Button>{" "}
            <Button color='secondary' onClick={toggle}>
                <IntlMessages id='prompt.decline' />
            </Button>
        </ModalFooter>
    </Modal>
}

export default PromptModal
