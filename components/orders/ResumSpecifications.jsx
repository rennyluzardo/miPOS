import { Row, Col } from 'antd'

const ResumSpecifications = () => {
  return (
    <div className="specifications">
      <div className="specifications__time-box">
        <h4>Tiempo 1</h4>
      </div>
      <div className="specifications__body-resum">
        <div className="container-resum">
          <Row className="item-resum">
            <Col span={3} className="item-resum__left">1</Col>
            <Col span={21} className="item-resum__right">
              <div className="item-resum__right--title">Nachos</div>
              <div className="item-resum__right--value">$ 82</div>
            </Col>
          </Row>
          <Row className="additional">
            <Col className="container">
              <div className="container__motive">Sin:</div>
              <Row gutter={[10, 10]} className="container__box">
                <Col span={8} className="container__box--item">
                  <div className="title">Cebolla</div>
                </Col>
              </Row>
              <div>Aparte:</div>
              <Row className="item-resum">
                <Col span={3} className="item-resum__left">1</Col>
                <Col span={21} className="item-resum__right">
                  <div className="item-resum__right--title">Nachos</div>
                  <div className="item-resum__right--value">$ 82</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default ResumSpecifications