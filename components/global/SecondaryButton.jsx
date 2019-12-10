import { Button } from 'antd'

const SecondaryButton = props => {
  return (
    <Button
      className={`secondary-button ${props.style}`}
      onClick={props.onClick}
      loading={props.loading}>{props.text}</Button>
  )
}

export default SecondaryButton