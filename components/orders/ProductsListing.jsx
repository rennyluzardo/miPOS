import { Col, Row } from 'antd'

const ProductsListing = props => {
  const mockProducts = [
    {
      id: 53,
      name: 'Porky belly buns',
      price: 105.00
    },
    {
      id: 25,
      name: 'Chilli con Queso',
      price: 85.00
    },
    {
      id: 51,
      name: 'Jitometes Heirloom con Calamares',
      price: 125.00
    },
    {
      id: 4,
      name: 'Alitas de pollo buffalo',
      price: 140.00
    },
    {
      id: 87,
      name: 'Bacorn - DIP de Elote, Tocino y Queso',
      price: 125.00
    },
    {
      id: 72,
      name: 'Pickles - Zanahoria, pepino con salsa de so…',
      price: 45.00
    }
  ]
  return (
    <div style={{ padding: '30px' }}>
      <Row gutter={[10, 20]}>
        {
          mockProducts.map((product, i) => {
            return <Col span={8} key={i}>
              <div className="products-box" onClick={() => props.onSetProduct(product)}>
                <div className="products-box__name">{product.name}</div>
                <div className="products-box__price">$ {product.price.toFixed(2)}</div>
              </div>
            </Col>
          })
        }
      </Row>
    </div>
  )
}

export default ProductsListing