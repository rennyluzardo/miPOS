import { Row, Col, Icon, Button } from 'antd'
// Components
import Counter from '../global/Counter'

const OrderToolbar = props => {
  const counterPlacesProps = {
    selectedProduct: props.selectedProduct,
    spotPlaces: props.spotPlaces,
    windowDimensions: props.windowDimensions,
    onCounter: props.onCounter,
    operationLeft: 'removePlace' ,
    operationRight: 'addPlace',
    isToolbar: true
  }

  return (
    <div className="order-toolbar">
      <Row>
        <Col span={15}>
          <div className="order-toolbar__alternative-box">
            <div className="order-toolbar__alternative-box--board-number">
              <Button onClick={props.onBack} shape="circle">
                <Icon type="left" className="btn-back-toolbar" />
              </Button>
              {
                (props.currentStep === 'PRODUCT' ||
                  props.currentStep === 'ADDITIONAL') && // Y ALLA YUN PRODUCTO SELECCIONADO
                <div
                  style={{ width: '50px', height: '50px', marginRight: '15px', backgroundColor: 'paleturquoise', borderRadius: '15px' }}
                  src="static/images/top-bar-menu/miPOS-Shop_coin.svg" alt="">img</div>
              }
              <h3 className={props.currentStep === 'PRODUCT' /** Y ALLA UN PRODUCT SELECCINADO */ || props.currentStep === 'ADDITIONAL' ? 'text2' : 'text'}>
                {(props.currentStep === 'CATEGORY' || props.currentStep === 'ADDITIONAL') && 'Mesa 01'}
              </h3>
            </div>
            {
              (props.currentStep === 'CATEGORY' || props.currentStep === 'ADDITIONAL') &&
              <div className="order-toolbar__alternative-box--counter">
                <Counter {...counterPlacesProps} />
              </div>
            }
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
  )
}

export default OrderToolbar