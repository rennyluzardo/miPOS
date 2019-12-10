import { Button } from 'antd'

const PrimaryButton = props => {
  return (
    <Button
      type="primary"
      className={`primary-button ${props.style}`}
      onClick={props.onClick}
      loading={props.loading}>{props.text}</Button>
  )
}

export default PrimaryButton