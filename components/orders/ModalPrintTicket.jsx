import { Modal } from 'antd'

import React from 'react'

const ModalPrintTicket = () => {
    return (
        <div>
            <Modal
                title="Basic Modal"
                visible={props.visible}
                onOk={props.handleOk}
                onCancel={props.handleCancel}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}

export default ModalPrintTicket