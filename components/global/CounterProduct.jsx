import { Row, Col, Icon, Button } from 'antd'
import _ from 'lodash'

const CounterProduct = props => {
  return (
    <Row className="counter-product">
      <Col span={4} className="counter-product__left" onClick={() => props.onCounter(props.operationLeft)}>
        <Icon type="minus" />
      </Col>
      <Col span={8} className="counter-product__center">{props.spotPlaces} {props.isToolbar ? 'personas' : props.selectedProduct.quantity}</Col>
      <Col span={4} className="counter-product__right" onClick={() => props.onCounter(props.operationRight)}>
        <Icon type="plus" />
      </Col>
    </Row>
  )
}

export default CounterProduct