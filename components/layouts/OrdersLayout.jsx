import { Layout, Row, Col, Divider } from 'antd'
import images from '../../lib/images'

// Components
import TopMenuBar from '../global/TopMenuBar'
import TopUserMenu from '../global/TopUserMenu'
import ButtonPrimary from '../global/ButtonPrimary'

const { Header, Sider, Content } = Layout

const OrdersLayout = props => {
    return (
        <Layout className="orders-layout">
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
                <Sider theme="light" width={380}>
                    <div className="sider-container">
                        <div>
                            <Col span={24} className="top-sider-container">
                                <div className="top-sider-container__title">
                                    <h4>ORDEN</h4>
                                </div>
                                <div className="top-sider-container__info">
                                    <div className="top-sider-container__info--1">Mesa 01</div>
                                    <div className="top-sider-container__info--1">Orden: 0129</div>
                                </div>
                            </Col>
                        </div>
                        <div className="products-resum">
                            {/* TODO: condicional si hay productos mostrar detalle de productos */}
                            {/* Mensaje cuando no hay productos */}
                            {/* <Col span={24} className="no-products">
                                <div className="no-products__img">
                                    <img src={images.noProducts} alt="" />
                                </div>
                                <div className="no-products__text">
                                    <p>Selecciona el pedido para esta mesa</p>
                                </div>
                            </Col> */}

                            {/* Seleccion de adicionales */}
                            <div className="products-resum__content">
                                <div className="products-resum__content--time-box">
                                    <h4>Tiempo 1</h4>
                                </div>
                            </div>
                            <div className="products-resum__separator">
                                <Divider />
                            </div>
                            <div className="products-resum__totals">
                                <div className="products-resum__totals--grid">
                                    <div className="total-row">
                                        <div>Alimentos</div>
                                        <div>$ 135,00</div>
                                    </div>
                                    <div className="total-row">
                                        <div>Sub total</div>
                                        <div>$ 135,00</div>
                                    </div>
                                    <div className="total-row">
                                        <div>Total</div>
                                        <div>$ 135,00</div>
                                    </div>
                                </div>
                            </div>
                            <div className="products-resum__bottom-action">
                                <ButtonPrimary text="Enviar a cocina" style="send-btn" />
                            </div>
                        </div>
                    </div>
                </Sider>
                <Content className="custom-content">{props.children}</Content>
            </Layout>
        </Layout>
    )
}

export default OrdersLayout