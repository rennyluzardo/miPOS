import { Col, Row } from 'antd'

// Components
import Counter from '../global/Counter'

const AdditionalsListing = props => {
  const mockAdditionals = [
    {
      id: 53,
      name: 'Arroz blanco'
    },
    {
      id: 25,
      name: 'Arroz Jardinera'
    },
    {
      id: 51,
      name: 'Papas fritas'
    },
    {
      id: 4,
      name: 'Papas al vapor'
    },
    {
      id: 87,
      name: 'Aguacate'
    },
    {
      id: 72,
      name: 'Platano al horno'
    },
    {
      id: 124,
      name: 'Yuca'
    },
    {
      id: 545,
      name: 'Yuca Frita'
    },
    {
      id: 664,
      name: 'Ensalada cocida'
    },
    {
      id: 235,
      name: 'Ensalada Cesar'
    }
  ]
  return (
    <div style={{ padding: '30px' }}>
      <Row gutter={[10, 20]}>
        {
          mockAdditionals.map((additional, i) => {
            return <Col span={6} key={i}>
              <div className="products-box" onClick={() => props.onSetAdditional(additional)}>
                <div className="products-box__name">{additional.name}</div>
                {additional.id === props.selectedAdditionals.id && <Counter />}
              </div>
            </Col>
          })
        }
      </Row>
    </div>
  )
}

export default AdditionalsListing