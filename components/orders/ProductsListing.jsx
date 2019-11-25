import { Col, Row } from 'antd'

const ProductsListing = props => {
  return (
    <div style={{ padding: '30px' }}>
      <Row gutter={[10, 20]}>
        {
          !!props.products && props.products.map((product, i) => {
            return <Col span={8} key={i}>
              <div className="products-box" onClick={() => props.onSetProduct(product)}>
                <div className="products-box__name">{product.name}</div>
                {/* <div className="products-box__price">$ {product.price.toFixed(2)}</div> */}
              </div>
            </Col>
          })
        }
      </Row>
    </div>
  )
}

export default ProductsListing