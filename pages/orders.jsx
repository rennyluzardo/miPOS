import { useContext, useEffect } from 'react'
import { Row, Col, Icon, Button } from 'antd'
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

    const goToHome = () => {
        Router.pushRoute('index')
    }

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
                            <div>
                                {/* TODO: Counter Component */}
                                <Row>
                                    <Col span={4}>-</Col>
                                    <Col span={16}>2 personas</Col>
                                    <Col span={4}>+</Col>
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
            <div>Products..</div>
        </OrdersLayout>
    )
}

export default Orders