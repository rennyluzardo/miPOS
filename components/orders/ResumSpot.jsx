import { Row, Col } from 'antd'
import { centsToDollar } from '../../lib/utils'

const ResumSpot = props => {
  return (
    <Row className="product-cart">
      {
        !!props.spotProducts && props.spotProducts.map((spot, i) => {
          return [<Col span={24} key={i}>
            <h3 className="product-cart__title">Categoria</h3>
          </Col>,
          <Col span={24} key={spot}>
            <div className="product-cart__item" onClick={() => props.onSelectEditProduct(spot)}>
              <div className="product-cart__item--qty">{spot.quantity}</div>
              <div className="product-cart__item--name">{spot.name_product}</div>
              <div className="product-cart__item--price">$ {centsToDollar(spot.nt_value).toFixed(2)}</div>
            </div>
          </Col>]
        })
      }
    </Row>
  )
}

export default ResumSpot