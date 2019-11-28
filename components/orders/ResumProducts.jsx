import { useContext } from 'react'
import { Store } from '../../config/store'
import { Row, Col } from 'antd'

const ResumProducts = () => {
  const { state, dispatch } = useContext(Store)

  return (
    <Row className="product-cart">
      {
        !!state.spot && !!state.spot.details && state.spot.details.map(spot => {
          return [<Col span={24}>
            <h3 className="product-cart__title">Categoria</h3>
          </Col>,
          <Col span={24}>
            <div className="product-cart__item">
              <div className="product-cart__item--qty">{spot.quantity}</div>
              <div className="product-cart__item--name">{spot.name_product}</div>
              <div className="product-cart__item--price">$ 10</div>
            </div>
          </Col>]
        })
      }
    </Row>
  )
}

export default ResumProducts