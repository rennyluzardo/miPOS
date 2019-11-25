import { Button } from 'antd'

const PrimaryButton = props => {
  return (
    <Button
      type="primary"
      className={['primary-button', props.style]}>{props.text}</Button>
  )
}

export default PrimaryButton