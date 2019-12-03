import { Button } from 'antd'

const SecondaryButton = props => {
  return (
    <Button className="secondary-button">{props.text}</Button>
  )
}

export default SecondaryButton