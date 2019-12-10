import { Button, Divider } from 'antd'
import { Store } from '../config/store'
import { Router } from 'routes'

const Index = props => {
  const { state, dispatch } = React.useContext(Store)

  const onGoToView = (type) => {
    Router.push({
      pathname: '/orders',
      query: {
        type
      }
    })
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div>
        <Button onClick={() => onGoToView('Caja')}>Caja</Button>
      </div>
      <Divider type="vertical" />
      <div>
        <Button onClick={() => onGoToView('Spot')}>Mesa</Button>
      </div>
    </div>
  )
}

export default Index