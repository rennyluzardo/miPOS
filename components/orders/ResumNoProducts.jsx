import { Col } from 'antd'
import images from '../../lib/images'

const ResumNoProducts = () => {
    return (
        <Col span={24} className="no-products">
            <div className="no-products__img">
                <img src={images.noProducts} alt="" />
            </div>
            <div className="no-products__text">
                <p>Selecciona el pedido para esta mesa</p>
            </div>
        </Col>
    )
}
export default ResumNoProducts