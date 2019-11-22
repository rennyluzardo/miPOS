import { Row, Col, Icon, Button } from 'antd'
// Components
import Counter from '../global/Counter'

const OrderToolbar = props => {
  return (
    <div className="order-toolbar">
      <Row>
        <Col span={15}>
          <div className="order-toolbar__alternative-box">
            <div className="order-toolbar__alternative-box--board-number">
              <Button onClick={props.onBack} shape="circle">
                <Icon type="left" className="btn-back-toolbar" />
              </Button>

              <h3 className="text">Mesa 01</h3>
            </div>
            <div className="order-toolbar__alternative-box--counter">
              <Counter />
            </div>
          </div>
        </Col>
        <Col span={9}>
          <div className="order-toolbar__right-actions">
            <Button className="order-toolbar__right-actions--1">T1</Button>
            <Button className="order-toolbar__right-actions--2">T2</Button>
            <Button className="order-toolbar__right-actions--3">T3</Button>
            <Button className="order-toolbar__right-actions--cancel">Cancelar Orden</Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default OrderToolbar