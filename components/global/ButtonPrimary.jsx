import { Button } from 'antd'

const ButtonPrimary = props => {
  return (
    <Button
      type="primary"
      className={['primary-button', props.style]}>{props.text}</Button>
  )
}

export default ButtonPrimary