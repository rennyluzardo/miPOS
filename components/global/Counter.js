import { Row, Col, Icon, Button } from 'antd'

const Counter = () => {
    return (
        <Row className="counter-box">
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