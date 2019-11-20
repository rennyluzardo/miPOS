import { Layout, Row, Col } from 'antd'
import images from '../../lib/images'

// Components
import TopMenuBar from '../global/TopMenuBar'
import TopUserMenu from '../global/TopUserMenu'

const { Header, Sider, Content } = Layout

const OrdersLayout = props => {
    return (
        <div className="orders-layout">
            <Layout>
                <Header className="custom-orders-header">
                    <Row className="custom-orders-header__container">
                        <Col span={3}>
                            <div className="logo-top-container">
                                <img src={images.logo} alt="" />
                            </div>
                        </Col>
                        <Col span={16}>
                            <TopMenuBar />
                        </Col>
                        <Col span={5}>
                            <TopUserMenu />
                        </Col>
                    </Row>
                </Header>
                <Layout>
                    <Sider theme="light" breakpoint="md" mode="inline"    style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}>
                        <div className="sider-container">
                            <Row>
                                <Col span={24} className="top-sider-container">
                                    <div className="top-sider-container__title">
                                        <h4>ORDEN</h4>
                                    </div>
                                    <div className="top-sider-container__info">
                                        <div className="top-sider-container__info--1">Mesa 01</div>
                                        <div className="top-sider-container__info--1">Orden: 0129</div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} className="no-products">
                                    <div className="no-products__img">
                                        img<img src="" alt=""/>
                                    </div>
                                    <div className="no-products__text">
                                        <p>Selecciona el pedido para esta mesa</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Sider>
                    <Content>{props.children}</Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default OrdersLayout