import { Row, Col, Icon, Button } from 'antd'

const Counter = () => {
    return (
        <Row className="counter-box">
            <div className="product-selected">
                <div className="product-selected__circle">
                    <img
                        src="static/images/top-bar-menu/miPOS-Shop_Cutlery.svg"
                        alt=""
                        className="product-selected__circle--img" />
                </div>
                <span>Product Selected</span>
            </div>
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