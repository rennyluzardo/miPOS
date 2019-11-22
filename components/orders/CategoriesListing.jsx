import { Card, Col, Row } from 'antd'

const CategoriesListing = () => {
  const mockCategories = [
    {
      id: 1,
      name: 'Desayunos',
    },
    {
      id: 2,
      name: 'Entradas',
    },
    {
      id: 3,
      name: 'Almuerzos',
    },
    {
      id: 4,
      name: 'Bebidas',
    },
    {
      id: 5,
      name: 'Vinos',
    },
    {
      id: 6,
      name: 'Postres',
    },
    {
      id: 7,
      name: 'Piqueo'
    }
  ]
  return (
    <div style={{ padding: '30px' }}>
      <Row gutter={[15, 30]}>
        {
          mockCategories.map((category, i) => {
            return <Col span={4} key={i}>
              <Card
              bordered={false}
              hoverable
              cover={<img alt="img" src="" />}
              className="categories-box">
                {category.name}
              </Card>
            </Col>
          })
        }
      </Row>
    </div>
  )
}

export default CategoriesListing
