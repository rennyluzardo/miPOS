import { Layout, Row, Col } from 'antd'
import images from '../../lib/images'

// Components
import TopMenuBar from '../global/TopMenuBar'
import TopUserMenu from '../global/TopUserMenu'

const { Header, Sider, Content } = Layout

const OrdersLayout = props => {
    return (
        <div>
            <Layout>
                <Header className="custom-orders-header">
                    <Row className="custom-orders-header__container">
                        <Col span={3}>
                            <div className="logo-top-container">
                                <img src={images.logo} alt="" />
                            </div>
                        </Col>
                        <Col span={14}>
                            <TopMenuBar />
                        </Col>
                        <Col span={7}>
                            <TopUserMenu />
                        </Col>
                    </Row>
                </Header>
                <Layout>
                    <Sider theme="light" breakpoint="md">Sider</Sider>
                    <Content>{props.children}</Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default OrdersLayout