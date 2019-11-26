import { useContext } from 'react'
import { Store } from '../../config/store'
import { Row, Col } from 'antd'

const ResumProducts = props => {
  const { state, dispatch } = useContext(Store)

  return (
    <Row className="product-cart">
      {
        !!state.cart.categories && state.cart.categories.map(category => {
          return [<Col span={24}>
            <h3 className="product-cart__title">{category.name}</h3>
          </Col>,
          category.products.map(product => {
            return <Col span={24}>
              <div className="product-cart__item">
                <div className="product-cart__item--qty">1</div>
                <div className="product-cart__item--name">{product.name}</div>
                <div className="product-cart__item--price">$ 10</div>
              </div>
            </Col>
          })]
        })
      }
    </Row>
  )
}

export default ResumProducts