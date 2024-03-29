import { Col, Row } from 'antd'
import _ from 'lodash'
// Components
import Counter from '../global/Counter'

const AdditionalsListing = props => {
  return (
    <div style={{ padding: '30px' }}>
      <Row gutter={[10, 20]}>
        {
          !!props.specifications && props.specifications.map((specification, i) => {
            return <Col span={6} key={i}>
              <div className="products-box" onClick={() => props.onSetAdditional(specification)}>
                <div className="products-box__name">{specification.name}</div>
                {_.find(props.selectedAdditionals, add => add.id === specification.id) && <Counter isToolbar={false} />}
              </div>
            </Col>
          })
        }
      </Row>
    </div>
  )
}

export default AdditionalsListing