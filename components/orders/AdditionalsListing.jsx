import { Col, Row } from 'antd'
import _ from 'lodash'
// Components
import Counter from '../global/Counter'

const AdditionalsListing = props => {
  const counterPlacesProps = {
    isToolbar: false,
    onCounter: props.onCounter,
    operationLeft: 'removeProduct',
    operationRight: 'addProduct'
  }

  return (
    <div style={{ padding: '30px' }}>
      <Row gutter={[10, 20]}>
        {
          !!props.specifications && props.specifications.map((specification, i) => {
            return <Col span={4} className="items-container-x5" key={i}>
              <div className="products-box" onClick={() => props.onSetAdditional(specification)}>
                <div className="products-box__name">{specification.name}</div>
                {_.find(props.selectedAdditionals, add => add.id === specification.id) && <Counter {...counterPlacesProps} />}
              </div>
            </Col>
          })
        }
      </Row>
    </div>
  )
}

export default AdditionalsListing