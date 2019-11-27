import { Row, Col, Form, Input } from 'antd'
// Components
import CreateOrderLayout from '../components/layouts/CreateOrderLayout'

const createOrder = () => {
    return (
        <CreateOrderLayout>
            <Row>
                <Col span={12}>
                    <div>
                        <div>Tomar Pedido</div>
                        <div>Delivery: $80</div>
                    </div>
                    <Form>
                        <Form.Item
                            label="Numero de telefono"
                            validateStatus="error">
                            <Input placeholder="+52" /> <Input placeholder="p. ej. 55 3932 8403" />
                        </Form.Item>
                        <Row>
                            <Col>
                                <Form.Item
                                    label="Nombre">
                                    <Input placeholder="p. ej. Carlos" />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item
                                    label="Apellido">
                                    <Input placeholder="p. ej. Ramirez" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <div>
                            Tomar pedido
                        </div>
                    </Form>
                    <div>
                        separator
                    </div>
                    <div>
                        Direcciones
                    </div>
                </Col>
                <Col span={12}>
                    <div className="maps"></div>
                </Col>
            </Row>
        </CreateOrderLayout>
    )
}

export default createOrder