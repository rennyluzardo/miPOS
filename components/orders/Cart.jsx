import { Row, Col } from 'antd'
// Components
import PrimaryButton from '../global/PrimaryButton'
import SecondaryButton from '../global/SecondaryButton'
import { centsToDollar } from '../../lib/utils'

const Cart = props => {
  const propsBtnConfirm = {
    text: "Confirmar",
    style: "on-confirm-btn",
    loading: props.onConfirmLoading
  }

  const propsBtnDelete = {
    text: "Eliminar",
    style: "on-delete-btn"
  }

  return (
    <div className="specifications">
      <div className="specifications__time-box">
        <h4>Tiempo 1</h4>
      </div>
      <div className="specifications__body-resum">
        <div className="container-resum">
          {
            !!props.cart.products && props.cart.products.map(product => {
              return <div className={`container-resum__product ${!product.isConfirm ? 'bg-not-confirmed' : null}`}>
                {
                  !product.isConfirm &&
                  <div className="container-resum__actions-box">
                    <div className="container-resum__actions-box--left">
                      <div className="">
                        <SecondaryButton onClick={() => props.onRemoveProduct(product)} {...propsBtnDelete} />
                      </div>
                    </div>
                    <div className="container-resum__actions-box--right">
                      <div className="">
                        <PrimaryButton onClick={() => props.onConfirmProduct(product)} {...propsBtnConfirm} />
                      </div>
                    </div>
                  </div>
                }
                <Row className="item-resum">
                  <Col span={3} className="item-resum__left">{product.qty ? product.qty : product.quantity}</Col>
                  <Col span={21} className="item-resum__right">
                    <div className="item-resum__right--title">{product.name}</div>
                    <div className="item-resum__right--value">$ {product.base_value && centsToDollar(product.nt_value).toFixed(2)}</div>
                  </Col>
                </Row>
                <Row className="additional">
                  <Col className="container">
                    {
                      !!product.specifications && product.specifications.map(specification => {
                        return <div className="container__motive">Adicionales:
                         <Row gutter={[10, 10]} className="container__box">
                            {
                              !!specification.options && specification.options.map(option => {
                                return <Col span={8} className="container__box--item">
                                  <div className={`title ${!product.isConfirm ? 'title-not-confirm' : null}`}>{option.name}</div>
                                </Col>
                              })
                            }
                          </Row>
                        </div>
                      })
                    }

                    {/* MOCKS ADDITIONALS TEMPLATES */}
                    {/* <div className="container__motive">Sin:</div>
                    <Row gutter={[10, 10]} className="container__box">
                      <Col span={8} className="container__box--item">
                        <div className="title">Cebolla</div>
                      </Col>
                    </Row> */}

                    {/* <div>Aparte:</div>
                    <Row className="item-resum">
                      <Col span={3} className="item-resum__left">1</Col>
                      <Col span={21} className="item-resum__right">
                        <div className="item-resum__right--title">Nachos</div>
                        <div className="item-resum__right--value">$ 82</div>
                      </Col>
                    </Row> */}

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