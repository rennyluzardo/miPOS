import { Row, Col, Icon, Button } from 'antd'
import _ from 'lodash'

const Counter = props => {
    return (
        <Row className="counter-box">
            {
                (props.isToolbar && !_.isEmpty(props.selectedProduct)) &&
                // (!!props.selectedProduct && props.selectedProduct.id) &&
                <div className="product-selected">
                    <div className="product-selected__circle">
                        <img
                            src="static/images/top-bar-menu/miPOS-Shop_Cutlery.svg"
                            alt=""
                            className="product-selected__circle--img" />
                    </div>
                    <span className="product-selected__name">{props.selectedProduct.name}</span>
                </div>
            }
            <Button span={4} className="counter-box__left">
                <Icon type="minus" />
            </Button>
            <Col span={16} className="counter-box__center">2 personas</Col>
            <Button span={4} className="counter-box__right">
                <Icon type="plus" />
            </Button>
        </Row>
    )
}

export default Counter