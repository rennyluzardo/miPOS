import { Row, Col, Icon, Button } from 'antd'
import _ from 'lodash'

const Counter = props => {
    return (
        <Row className="counter-box" gutter={24}>
            {
                props.isToolbar && !_.isEmpty(props.selectedProduct) &&
                <div className="product-selected">
                    <div className="product-selected__circle">
                        <img
                            src="static/images/top-bar-menu/miPOS-Shop_Cutlery.svg"
                            alt=""
                            className="product-selected__circle--img" />
                    </div>
                    <span className="product-selected__name">{props.selectedProduct.name ? props.selectedProduct.name : props.selectedProduct.name_product}</span>
                </div>
            }
            <Col span={4} className="counter-box__left" onClick={() => props.onCounter(props.operationLeft)}>
                <Icon type="minus" />
            </Col>
            <Col span={3} className="counter-box__center">{props.spotPlaces} {props.isToolbar ? 'personas' : props.selectedProduct.quantity}</Col>
            <Col span={4} className="counter-box__right" onClick={() => props.onCounter(props.operationRight)}>
                <Icon type="plus" />
            </Col>
        </Row>
    )
}

export default Counter