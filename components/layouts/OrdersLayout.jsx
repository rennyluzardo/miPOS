import { useEffect, useContext } from 'react'
import { Store } from '../../config/store'
import _ from 'lodash'
import { Layout, Col } from 'antd'
// Components
import Head from '../global/Header'
import ResumSpecifications from '../orders/ResumSpecifications'
import FooterSider from '../global/FooterSider'
import ResumProducts from '../orders/ResumProducts'
import ResumNoProducts from '../orders/ResumNoProducts'
// Actions
import { fetchSpot } from '../../actions/spot'

const { Sider, Content } = Layout

const OrdersLayout = props => {
  const { state, dispatch } = useContext(Store)

  useEffect(() => {
    _.isEmpty(state.spot) && fetchSpot(dispatch)
  }, [])

  return (
    <Layout className="orders-layout">
      <Head goToHome={props.goToHome} />
      <Layout>
        <Sider theme="light" width={380}>
          <div className="sider-container">
            <div>
              {
                !!state.spot &&
                !!state.spot.results &&
                <Col span={24} className="top-sider-container">
                  <div className="top-sider-container__title">
                    <h4>Mesa {state.spot.results.spot_id} - ORDEN</h4>
                  </div>
                  <div className="top-sider-container__info">
                    <div className="top-sider-container__info--1">
                      <span>Mesa {state.spot.results.spot_id}</span><span>2 Personas</span>
                    </div>
                    <div className="top-sider-container__info--1">Orden: {state.spot.results.id}</div>
                  </div>
                </Col>
              }

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