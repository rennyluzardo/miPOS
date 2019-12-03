import { Row, Col } from 'antd'
// Components
import PrimaryButton from '../global/PrimaryButton'
import SecondaryButton from '../global/SecondaryButton'

const Cart = props => {
  const propsBtnConfirm = {
    text: "Confirmar"
  }

  const propsBtnDelete = {
    text: "Eliminar"
  }

  return (
    <div className="specifications">
      <div className="specifications__time-box">
        <h4>Tiempo 1</h4>
      </div>
      <div className="specifications__body-resum">
        <div className="container-resum">
          {
            props.cart.products && props.cart.products.map(product => {
              return <div className={"container-resum__product product-not-confirmed"}>
              <Row>
                <Col span={6}>
                  <div><SecondaryButton {...propsBtnDelete}/></div>
                </Col>
                <Col span={6}>
                  <div><PrimaryButton {...propsBtnConfirm} /></div>
                </Col>
              </Row>
                <Row className="item-resum">
                  <Col span={3} className="item-resum__left">{product.qty ? product.qty : product.quantity}</Col>
                  <Col span={21} className="item-resum__right">
                    <div className="item-resum__right--title">{product.name}</div>
                    <div className="item-resum__right--value">$ {product.price}</div>
                  </Col>
                </Row>
                <Row className="additional">
                  <Col className="container">

                    <div className="container__motive">Sin:</div>
                    <Row gutter={[10, 10]} className="container__box">
                      <Col span={8} className="container__box--item">
                        <div className="title">Cebolla</div>
                      </Col>
                    </Row>

                    <div>Aparte:</div>
                    <Row className="item-resum">
                      <Col span={3} className="item-resum__left">1</Col>
                      <Col span={21} className="item-resum__right">
                        <div className="item-resum__right--title">Nachos</div>
                        <div className="item-resum__right--value">$ 82</div>
                      </Col>
                    </Row>

                  </Col>
                </Row>
              </div>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Cart