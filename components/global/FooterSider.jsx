import { Divider } from 'antd'
// Components
import PrimaryButton from '../global/PrimaryButton'

const FooterSider = props => {
  return (
    <>
      <div className="separator">
        <Divider />
      </div>
      {/* TODO: Si no hay una categoria seleccionada y hay productos en el spot debo mostrar el 
      background de los taxes a color gris oscuro */}

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
      {
        props.spotType === 'Spot' && <div className="bottom-action">
          <PrimaryButton text="Enviar a cocina" style="send-btn" />
        </div>
      }
    </>
  )
}

export default FooterSider