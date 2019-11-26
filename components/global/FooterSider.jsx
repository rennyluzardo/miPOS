import { Divider } from 'antd'
// Components
import PrimaryButton from '../global/PrimaryButton'

const FooterSider = () => {
  return (
    <>
      <div className="separator">
        <Divider />
      </div>
      <div className="totals">
        <div className="totals--grid">
          <div className="total-row">
            <div>Alimentos</div>
            <div>$ 135,00</div>
          </div>
          <div className="total-row">
            <div>Sub total</div>
            <div>$ 135,00</div>
          </div>
          <div className="total-row">
            <div>Total</div>
            <div>$ 135,00</div>
          </div>
        </div>
      </div>
      <div className="bottom-action">
        <PrimaryButton text="Enviar a cocina" style="send-btn" />
      </div>
    </>
  )
}

export default FooterSider