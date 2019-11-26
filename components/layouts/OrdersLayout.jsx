import { Layout, Col } from 'antd'
// Components
import Head from '../global/Header'
import ResumSpecifications from '../orders/ResumSpecifications'
import FooterSider from '../global/FooterSider'
import ResumProducts from '../orders/ResumProducts'
import ResumNoProducts from '../orders/ResumNoProducts'

const { Sider, Content } = Layout

const OrdersLayout = props => {
  return (
    <Layout className="orders-layout">
      <Head goToHome={props.goToHome} />
      <Layout>
        <Sider theme="light" width={380}>
          <div className="sider-container">
            <div>
              <Col span={24} className="top-sider-container">
                <div className="top-sider-container__title">
                  <h4>Mesa 01 - ORDEN</h4>
                </div>
                <div className="top-sider-container__info">
                  <div className="top-sider-container__info--1">
                    <span>Mesa 01</span><span>2 Personas</span>
                  </div>
                  <div className="top-sider-container__info--1">Orden: 0129</div>
                </div>
              </Col>
            </div>
            <div className="products-resum">
              {/* <ResumNoProducts /> */}
              {/* <ResumSpecifications /> */}
              <ResumProducts />
              <FooterSider />
            </div>
          </div>
        </Sider>
        <Content className="custom-content">{props.children}</Content>
      </Layout>
    </Layout>
  )
}

export default OrdersLayout