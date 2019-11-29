import { Card, Col, Row } from 'antd'

const CategoriesListing = props => {
  return (
    <div style={{ padding: '30px' }}>
      <Row gutter={[15, 30]}>
        {
          !!props.categories && props.categories.map((category, i) => {
            return <Col span={4} className="items-container-x5" key={i}>
              <Card
                bordered={false}
                hoverable
                cover={<img alt="img" src="" />}
                className="categories-box"
                onClick={() => props.onSetCategory(category)}>
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
