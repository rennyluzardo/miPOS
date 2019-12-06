import React from 'react';
import { Layout, Row, Col, Button, Tag, Radio } from 'antd';
import { MpCutleryIcon, MpRappiIcon } from '../../icon';

import _ from 'lodash';

const { Header, Content } = Layout;

const PaymentLayout = ({
  children,
  normalOtherPayment,
  onSwitchNormalOtherPayment,
  foodService,
  onSwitchFoodService,
  nextBillingNumber
}) => {

  return (
    <Layout className="payment-layout-white">

      <Header className="custom-payment-header">
        <div className="custom-payment-header-wrapper">

          <div className="custom-payment-header-left">
            <img className="payment-avatar" src="static/images/logo/miPOS-Circle.png" alt="" />
            <Button className="payment-arrow-left" type="link" shape="circle" icon="arrow-left" size="large" />

            <Radio.Group className="header-radio-button" defaultValue="a" buttonStyle="solid">
              <Radio.Button value="a">
                <div className="header-radio-wrapper">
                  <img className="header-radio-img" src="https://cdn.zeplin.io/5dbafce86c01177439541bdd/assets/F198781C-5F8B-4D85-8A0C-81863DC75170.svg" />
                  <div className="header-radio-title">Normal</div>
                </div>
              </Radio.Button>
              <Radio.Button value="b">
                <div className="header-radio-wrapper">
                  <img className="header-radio-img" src="https://cdn.zeplin.io/5dbafce86c01177439541bdd/assets/AE84314D-D177-432B-BEF0-AED4C22F28D2.svg" />
                  <div className="header-radio-title">Dividir Pagos</div>
                </div>
              </Radio.Button>
              <Radio.Button value="c">
                <div className="header-radio-wrapper">
                  <img className="header-radio-img" src="https://cdn.zeplin.io/5dbafce86c01177439541bdd/assets/8989CFFF-3F08-4C3E-8E7F-04F16FC87046.svg" />
                  <div className="header-radio-title">Dividir Cuentas</div>
                </div>
              </Radio.Button>
              <Radio.Button value="d">
                <img className="header-radio-img" src="https://cdn.zeplin.io/5dbafce86c01177439541bdd/assets/847F6231-6BF8-4584-B69D-B6AF194AE2D7.svg" />
                <Tag>10% de descuento</Tag>
              </Radio.Button>
            </Radio.Group>
          </div>

          <div className="custom-payment-header-right">

            <div style={{ marginRight: '1rem' }}>Factura: {nextBillingNumber || '-'} </div>

            <Radio.Group className="toggle-radio-button" value={foodService} buttonStyle="solid">
              <Radio.Button value={true} onClick={onSwitchFoodService}>
                <div className="header-radio-wrapper">
                  <MpCutleryIcon width="1.5rem" height="1.5rem" fill="#6f57d8" />
                  <div className="header-radio-title-wrap">Servicio de alimentos</div>
                </div>
              </Radio.Button>
            </Radio.Group>

            <Radio.Group className="toggle-radio-button" value={normalOtherPayment} buttonStyle="solid">
              <Radio.Button value={true} onClick={onSwitchNormalOtherPayment}>
                <div className="header-radio-wrapper">
                  <MpRappiIcon width="2rem" height="2rem" />
                  <div className="header-radio-title">Otros</div>
                </div>
              </Radio.Button>
            </Radio.Group>

          </div>

        </div>
      </Header>

      <Content>
        {children}
      </Content>

    </Layout>
  )
};

export default PaymentLayout;