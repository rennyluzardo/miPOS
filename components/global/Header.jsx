import { Row, Col, Layout } from 'antd'
// Components
import TopMenuBar from '../global/TopMenuBar'
import TopUserMenu from '../global/TopUserMenu'
import LogoFloatTop from '../global/LogoFloatTop'
// Assets
import images from '../../lib/images'

const { Header } = Layout

const Head = props => {
  return (
    <Header className={`custom-orders-header ${props.hide ? 'hide-top-bar' : ''}`}>
      <LogoFloatTop hide={!props.hide} onHideTopBar={() => props.onHideTopBar(props.hide === true ? false : true)} />
      <Row className="custom-orders-header__container">
        <Col span={3}>
          <div className="logo-top-container">
            <img src={images.logo} alt="" onClick={props.goToHome} />
          </div>
        </Col>
        <Col span={16}>
          <TopMenuBar />
        </Col>
        <Col span={5}>
          <TopUserMenu onHideTopBar={() => props.onHideTopBar(props.hide === true ? false : true)} />
        </Col>
      </Row>
    </Header>
  )
}

export default Head