import { Modal, Row, Col, Collapse, Icon, Divider } from 'antd'
// Components
import PrimaryButton from '../global/PrimaryButton'

const { Panel } = Collapse

const genExtra = () => (
    <Icon
        type="setting"
        onClick={event => {
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation()
        }}
    />
)

const TotalsBox = () => (
    <div>
        <div className="totals print-totals">
            <div className="totals--grid">
                <div className="total-row">
                    <div>Alimentos</div>
                    <div>$ 135,00</div>
                </div>
                <div className="total-row">
                    <div>Sub total</div>
                    <div>$ 135,00</div>
                </div>
                <div className="total-row">
                    <div>Total</div>
                    <div>$ 135,00</div>
                </div>
            </div>
        </div>
        <PrimaryButton text="Imprimir" style="modal-print-ticket__print-btn" />
    </div>
)

const ModalPrintTicket = props => (
    <Modal
        visible={props.visible}
        // onOk={props.handleOk}
        onCancel={props.handleCancel}
        className="modal-print-ticket"
        footer={<TotalsBox />}
    >
        <Row className="modal-print-ticket__custom-modal-body">
            <Col className="modal-print-ticket__custom-modal-body--top-box">
                <div>IMG</div>
                <div className="modal-print-ticket__custom-modal-body--top-message">Estas por imprimir el ticket </div>
            </Col>
            <Col>
                <Collapse
                    // onChange={callback}
                    expandIconPosition={'right'}
                >
                    <Panel header="Descuento" key="1" extra={genExtra()}>
                        <div>{'Loremp Ipsum'}</div>
                    </Panel>
                </Collapse>
            </Col>
            <Col></Col>
            <Col></Col>
        </Row>
    </Modal>
)


export default ModalPrintTicket