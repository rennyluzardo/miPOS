import _ from 'lodash'
import { Layout, Col } from 'antd'
// Components
import Head from '../global/Header'
import Cart from '../orders/Cart'
import FooterSider from '../global/FooterSider'
import ResumSpot from '../orders/ResumSpot'
import ResumNoProducts from '../orders/ResumNoProducts'
// import LogoFloatTop from '../global/LogoFloatTop'
const { Sider, Content } = Layout

const OrdersLayout = props => {

  const propsResumProducts = {
    onSelectEditProduct: props.onSelectEditProduct,
    spotProducts: props.spotProducts
  }

  const propsCart = {
    cart: props.cart
  }

  return (
    <Layout className="orders-layout">
      <Head
        goToHome={props.goToHome}
        hide={props.hideTopBar}
        onHideTopBar={props.onHideTopBar} />
      <Layout className={["custom-layout-sider", props.hideTopBar ? "sider-hide" : null]}>
        <Sider theme="light" width={380}>
          <div className="sider-container">
            <div>
              {
                <Col span={24} className="top-sider-container">
                  <div className="top-sider-container__title">
                    <h4>Mesa {!!props.spot && props.spot.results && props.spot.results.spot_id} - ORDEN</h4>
                  </div>
                  <div className="top-sider-container__info">
                    <div className="top-sider-container__info--1">
                      <span>Mesa {!!props.spot && props.spot.results && props.spot.results.spot_id}</span><span>{props.spotPlaces} Personas</span>
                    </div>
                    <div className="top-sider-container__info--1">Orden: {!!props.spot && props.spot.results && props.spot.results.id}</div>
                  </div>
                </Col>
              }
            </div>
            <div className="products-resum">
              {
                _.isEmpty(props.spotProducts) &&
                _.isEmpty(props.selectedCategory) &&
                <ResumNoProducts />
              }
              {
                !_.isEmpty(props.selectedCategory) && <Cart {...propsCart} />
              }
              {
                !_.isEmpty(props.spotProducts) &&
                _.isEmpty(props.selectedCategory) &&
                <ResumSpot {...propsResumProducts} />
              }
              {/* {
                !_.isEmpty(props.selectedCategory) && <FooterSider />
              } */}
              {
                !_.isEmpty(props.spotProducts) && <FooterSider />
              }

            </div>
          </div>
        </Sider>
        <Content className="custom-content">{props.children}</Content>
      </Layout>
    </Layout>
  )
}

export default OrdersLayout