import { Layout } from 'antd'

// Components
import TopMenuBar from '../global/TopMenuBar'

const { Header, Sider, Content } = Layout

const OrdersLayout = props => {
    return (
        <div>
            <Layout>
                <Header className="custom-orders-header">
                    <TopMenuBar />
                    <TopMenuBar />
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