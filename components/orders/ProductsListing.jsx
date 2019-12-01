import { Col, Row } from 'antd'
import _ from 'lodash'
import { centsToDollar } from '../../lib/utils.js'
// Components
import CounterProduct from '../global/CounterProduct'

const ProductsListing = props => {
  const counterProductProps = {
    selectedProduct: props.selectedProduct,
    spotPlaces: props.spotPlaces,
    windowDimensions: props.windowDimensions,
    onCounter: props.onCounter,
    operationLeft: 'removeProduct',
    operationRight: 'addProduct',
    qtyProduct: props.qtyProduct
  }

  return (
    <div style={{ padding: '30px' }}>
      <Row gutter={[10, 20]}>
        {
          !!props.products && props.products.map((product, i) => {
            return <Col span={4} className="items-container-x5" key={i}>
              <div className="products-box" onClick={() => props.onSetProduct(product)}>
                <div className="products-box__name">{product.name}</div>
                {
                  !!props.selectedProduct &&
                  !!props.selectedProduct.product_detail &&
                  props.selectedProduct.product_detail.product_id === product.id &&
                  <CounterProduct {...counterProductProps} />
                }
              </div>
              {
                !!props.selectedProduct &&
                  !!props.selectedProduct.id &&
                  props.selectedProduct.id === product.id &&
                  _.isEmpty(props.selectedProduct.specifications)
                  ? <CounterProduct {...counterProductProps} />
                  : <div className="products-box__price">$ {centsToDollar(product.nt_value).toFixed(2)}</div>
              }
            </Col>
          })
        }
      </Row>
    </div>
  )
}

export default ProductsListing