import { useContext, useEffect } from 'react'
import { Row, Col, Icon, Button, Divider } from 'antd'
import { Store } from '../config/store'
import { Router } from '../routes'

// Actions
import { fetchProducts } from '../actions/product'

// Components
import OrdersLayout from '../components/layouts/OrdersLayout'
import '../scss/styles.scss'

const Orders = props => {
    const { state, dispatch } = useContext(Store)
    const { router } = props

    useEffect(() => {
        state.products.length === 0 && fetchProducts(dispatch)

        // effect

        // return () => {
        //     cleanup
        // }
    })

    return (
        <OrdersLayout>
            <div className="order-toolbar">
                <Row>
                    <Col span={15}>
                        <div className="order-toolbar__alternative-box">
                            <div className="order-toolbar__alternative-box--board-number">
                                <Icon type="left" className="btn-back-toolbar" />
                                <h3 className="text">Mesa 01</h3>
                            </div>
                            <div className="order-toolbar__alternative-box--counter">
                                {/* TODO: Create counter component */}
                                <Row className="counter-box">
                                    <Button span={4} className="counter-box__left">
                                        <Icon type="minus" />
                                    </Button>
                                    <Col span={16} className="counter-box__center">2 personas</Col>
                                    <Button span={4} className="counter-box__right">
                                        <Icon type="plus" />
                                    </Button>
                                </Row>
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
            <div className="toolbar-divider">
                <Divider/>
            </div>
            <div>
                
            </div>
        </OrdersLayout>
    )
}

export default Orders