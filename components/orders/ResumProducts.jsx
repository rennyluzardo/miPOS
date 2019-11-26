import { Row, Col } from 'antd'

const mockCart = {
  categories: [{
    id: '192',
    name: 'Entradas',
    products: [{
      "id": 1072,
      "name": "Pizza",
      "search_string": "hamburgues",
      "description": "hamburguesa 120",
      "base_value": 2100000,
      "image": null,
      "status": 1,
      "invoice_name": "Hamburgues",
      "sku": "123344",
      "ask_instruction": 1,
      "eats_product_name": "Ninguno",
      "image_version": 0,
      "is_alcohol": 0,
      "deleted_at": null,
      "type_product": "null",
      "nt_value": 1874999.9999999998,
      "category_name": "Hamburguesas",
      "tax_values": "Object",
      "specifications": "Array[14]",
      "category": "Object",
      "taxes": "Array[2]"
    },
    {
      "id": 2658,
      "name": "Lasagna",
      "search_string": "kkkk",
      "description": null,
      "base_value": 10000,
      "image": null,
      "status": 1,
      "invoice_name": "kkkk",
      "sku": null,
      "ask_instruction": 1,
      "eats_product_name": "Ninguno",
      "image_version": 0,
      "is_alcohol": 1,
      "deleted_at": null,
      "type_product": "null",
      "nt_value": 8928.571428571428,
      "category_name": "Hamburguesas",
      "tax_values": "Object",
      "specifications": "Array[2]",
      "category": "Object",
      "taxes": "Array[1]"
    },
    {
      "id": 681,
      "name": "Hamburguesa de Carne",
      "search_string": "hamburguesa de carne",
      "description": null,
      "base_value": 500,
      "image": null,
      "status": 1,
      "invoice_name": "Hamburguesa de Carne",
      "sku": null,
      "ask_instruction": 0,
      "eats_product_name": "Ninguno",
      "image_version": 0,
      "is_alcohol": 0,
      "deleted_at": null,
      "type_product": "null",
      "nt_value": 446.4285714285714,
      "category_name": "Hamburguesas",
      "tax_values": "Object",
      "specifications": "Array[1]",
      "category": "Object",
      "taxes": "Array[2]"
    },
    {
      "id": 1717,
      "name": "Hamburguer 2",
      "search_string": "hamburguer 2",
      "description": null,
      "base_value": 20000,
      "image": null,
      "status": 1,
      "invoice_name": "Hamburguer 2",
      "sku": null,
      "ask_instruction": 0,
      "eats_product_name": "Ninguno",
      "image_version": 0,
      "is_alcohol": 0,
      "deleted_at": null,
      "type_product": "null",
      "nt_value": 17857.142857142855,
      "category_name": "Hamburguesas",
      "tax_values": "Object",
      "specifications": "Array[0]",
      "category": "Object",
      "taxes": "Array[0]"
    }
    ]
  }]
}

const ResumProducts = () => {
  return (
    <>
      {
        mockCart.categories.map(category => {
          return <Row className="product-cart">
            <Col span={24}>
              <h3 className="product-cart__title">{category.name}</h3>
            </Col>
            {
              category.products.map(product => {
                return <Col span={24}>
                  <div className="product-cart__item">
                    <div className="product-cart__item--qty">1</div>
                    <div className="product-cart__item--name">{product.name}</div>
                    <div className="product-cart__item--price">$ 10</div>
                  </div>
                </Col>
              })
            }
          </Row>
        })
      }
    </>
  )
}

export default ResumProducts