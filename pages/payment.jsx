import React, { useContext, useEffect, useState, useReducer } from 'react';
import { Row, Col, Card, Button, Radio, Divider, Input } from 'antd';
import { MpCashIcon, MpVisaIcon, MpAmexIcon, MpMasterCardIcon, MpDinersClubIcon, MpClipIcon, MpRappiIcon } from '../icon';
import PaymentLayout from '../components/layouts/PaymentLayout';
import { PaymentRadioButton } from '../components/global/PaymentRadioButton';
import { Store } from '../config/store';
import { fetchCards, fetchNextBillingNumber, fetchPreOrder, fetchSuggestions, createOrderSplit } from '../actions/payment';
import { centsToMoney, money } from '../helper/formatter';
import _ from 'lodash';

const Payment = () => {
  const { state, dispatch } = useContext(Store);
  const { preorder = {} } = state;
  const { summary: { total = 0 } = {} } = preorder;


  const [paymentState, paymentDispatch] = useReducer(paymentReducer, paymentInitialState);

  const received = Object.keys(PaymentTypes).reduce((prev, key) => prev + parseFloat(paymentState[key].value || 0), 0) * 100;
  const onSetPaymentValue = ({ type, paymentType }) => (payload) => paymentDispatch({ type, paymentType, payload });


  const [normalOtherPayment, setNormalOtherPayment] = useState(false);
  const [foodService, setFoodService] = useState(false);

  const onSwitchNormalOtherPayment = () => {
    setNormalOtherPayment(val => !val);
  };

  const onSwitchFoodService = () => {
    setFoodService(val => !val);
  };

  useEffect(() => {
    fetchCards(dispatch);
    fetchNextBillingNumber(dispatch);
    fetchPreOrder(dispatch);
  }, []);

  useEffect(() => {
    if (preorder) {
      let { summary: { total = 0 } = {} } = preorder;
      fetchSuggestions(dispatch, centsToMoney(total))
    };
  }, [preorder]);

  return (
    <>
      <PaymentLayout
        normalOtherPayment={normalOtherPayment}
        onSwitchNormalOtherPayment={onSwitchNormalOtherPayment}
        foodService={foodService}
        onSwitchFoodService={onSwitchFoodService}
        nextBillingNumber={state.nextBillingNumber}
      >

        <Resume subtotal={total} received={received} />

        <NormalPayment
          paymentState={paymentState}
          onSetPaymentValue={onSetPaymentValue}
          normalOtherPayment={normalOtherPayment}
        />

      </PaymentLayout>
    </>
  );
};

const Resume = ({ subtotal = 0, received = 0 }) => {
  const toReturn = received - subtotal;

  console.log(received)
  console.log(subtotal)
  console.log(toReturn);

  return (
    <Row className="payment-resume" type="flex" justify="center">
      <Col span={3}>
        <div className="resume-data">
          <div className="resume-title">Subtotal</div>
          <div className="resume-qty">{money(centsToMoney(subtotal))}</div>
        </div>
      </Col >
      <Col span={1}>
        <div className="resume-data">
          <div className="resume-title">.</div>
          <div className="resume-qty">-</div>
        </div>
      </Col>
      <Col span={3}>
        <div className="resume-data">
          <div className="resume-title">Recibido</div>
          <div className="resume-qty">{money(centsToMoney(received))}</div>
        </div>
      </Col>
      <Col span={1}>
        <div className="resume-data">
          <div className="resume-title">.</div>
          <div className="resume-qty">=</div>
        </div>
      </Col>
      <Col span={3}>
        <div className="resume-data">
          <div className="resume-title">Devolver</div>
          <div className="resume-qty">{money(centsToMoney(toReturn))}</div>
        </div>
      </Col>
    </Row >
  );
};

const PaymentCard = ({ children, title, icon }) => {
  return (
    <>
      <Card className="payment-card">
        <Col span={8}>
          <div className="payment-method-title">
            <div>
              {icon}
            </div>
            <div className="payment-method-name">{title}</div>
          </div>
        </Col>
        <Col span={16}>
          {children}
        </Col>
      </Card>
    </>
  );
};

const NormalPayment = ({
  normalOtherPayment,
  paymentState,
  onSetPaymentValue
}) => {

  const [step, setStep] = useState('1');

  const onStepOne = () => setStep('1');
  const onStepTwo = () => setStep('2');

  return (
    <>
      <Row className="payment-method-wrapper" type="flex" justify="center">
        <Col span={18}>
          {
            step === '1' &&
            <>
              <NormalPaymentStepOne
                normalOtherPayment={normalOtherPayment}
                paymentState={paymentState}
                onSetPaymentValue={onSetPaymentValue}
              />
              <Row type="flex" justify="center">
                <Button className="tertiary-button payment-next-button" type="primary" onClick={onStepTwo}>
                  Siguiente
                </Button>
              </Row>
            </>
          }

          {
            step === '2' &&
            <>
              <NormalPaymentStepTwo normalOtherPayment={normalOtherPayment} />
              <Row type="flex" justify="center">
                <Button className="tertiary-button payment-button" type="primary" onClick={onStepOne}>
                  Regresar
                </Button>
                <Button className="primary-button payment-button" type="primary" onClick={onStepOne}>
                  Procesar Pago
                </Button>
              </Row>
            </>
          }
        </Col>
      </Row>
    </>
  );
};

const paymentInitialState = {
  cash: {},
  card: {},
  transfer: {},
  other: {},
  rappiPay: {}
};

const paymentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_VALUE':
      return { ...state, [action.paymentType]: action.payload };
    case 'SET_VALUE_AND_CLEAN':
      return { ...paymentInitialState, [action.paymentType]: action.payload };
    default:
      throw { ...state };
  }
};

const PaymentTypes = {
  cash: 'cash',
  card: 'card',
  transfer: 'transfer',
  other: 'other',
  rappiPay: 'rappiPay'
};

const CARD_TYPES = {
  CREDIT: 'CREDIT',
  DEBIT: 'DEBIT'
};

const NormalPaymentStepOne = ({
  normalOtherPayment,
  paymentState,
  onSetPaymentValue
}) => {

  const { state, dispatch } = useContext(Store);

  const {
    cards,
    preorder: {
      summary: { total = 0 } = {}
    } = {},
    suggestions = []
  } = state;

  const [cardType, setCardType] = useState(CARD_TYPES.CREDIT);
  const [shownCards, setShownCards] = useState([]);

  const onChangeCardType = (e) => {
    let value = e.target.value;
    setCardType(value);
  };

  useEffect(() => {
    if (cardType === CARD_TYPES.CREDIT) {
      setShownCards(cards.credit || []);
    }

    if (cardType === CARD_TYPES.DEBIT) {
      setShownCards(cards.debit || []);
    }
  }, [cardType, cards]);

  let newSuggestions = suggestions.map(sug => ({ key: centsToMoney(sug), value: money(centsToMoney(sug)) }));

  return (
    <>
      {
        !normalOtherPayment &&
        <>
          <PaymentCard title="Efectivo" icon={<MpCashIcon width="2rem" height="2rem" />} >
            <PaymentRadioButton
              value={paymentState.cash}
              options={[...[{ key: centsToMoney(total), value: money(centsToMoney(total)) }], ...newSuggestions]}
              customValue
              hook={onSetPaymentValue({ type: 'SET_VALUE', paymentType: PaymentTypes.cash })}
            />
          </PaymentCard>

          <PaymentCard title="Tarjeta" icon={<MpVisaIcon width="2rem" height="2rem" />} >
            {/* <PaymentRadioButton /> */}
            <Radio.Group className="primary-radio-button" defaultValue={""} buttonStyle="solid">
              {
                shownCards.map(card =>
                  <Radio.Button key={card.id} value={card.id}>
                    <CardIcon name={card.name} />
                  </Radio.Button>
                )
              }
            </Radio.Group>
            <Divider />
            <Row>
              <Col span={7}>
                <Radio.Group className="primary-radio-button" buttonStyle="solid" onChange={onChangeCardType} value={cardType}>
                  <Radio.Button value={CARD_TYPES.CREDIT}>Crédito</Radio.Button>
                  <Radio.Button value={CARD_TYPES.DEBIT}>Débito</Radio.Button>
                </Radio.Group>
              </Col>
              {/* <Col span={7}>
              <Divider type="vertical" />
            </Col> */}
              <Col span={6}>
                <Input size="large" placeholder="Voucher" />
              </Col>
            </Row>
          </PaymentCard>

        </>
      }
      {
        normalOtherPayment &&
        <>
          <PaymentCard
            title="Transferencia"
            // icon={<MpCashIcon width={'2rem'} height={'2rem'} />}
            icon={<img src="https://cdn.zeplin.io/5dbafce86c01177439541bdd/assets/87AA9652-7005-4234-8E46-E80CAEDC5AC4.svg" />}
          >
            <PaymentRadioButton
              value={paymentState.transfer}
              options={[{ key: centsToMoney(total), value: money(centsToMoney(total)) }]}
              customValue
              hook={onSetPaymentValue({ type: 'SET_VALUE', paymentType: PaymentTypes.transfer })}
            />
          </PaymentCard>

          <PaymentCard
            title="Otro"
            // icon={<MpCashIcon width={'2rem'} height={'2rem'} />}
            icon={<img src="https://cdn.zeplin.io/5dbafce86c01177439541bdd/assets/FCCD457F-EF61-4369-92C3-06F47053FE82.svg" />}
          >
            <PaymentRadioButton
              value={paymentState.other}
              options={[{ key: centsToMoney(total), value: money(centsToMoney(total)) }]}
              customValue
              hook={onSetPaymentValue({ type: 'SET_VALUE', paymentType: PaymentTypes.other })}
            />
          </PaymentCard>

          <PaymentCard title="Rappi Pay" icon={<MpRappiIcon width="2rem" height="2rem" />} >
            <PaymentRadioButton
              value={paymentState.rappiPay}
              options={[{ key: centsToMoney(total), value: money(centsToMoney(total)) }]}
              customValue
              hook={onSetPaymentValue({ type: 'SET_VALUE', paymentType: PaymentTypes.rappiPay })}
            />
          </PaymentCard>

        </>
      }
    </>
  );
};

const NormalPaymentStepTwo = ({ normalOtherPayment }) => {

  return (
    <>
      <PaymentCard
        title="Propina"
        icon={<MpCashIcon width={'2rem'} height={'2rem'} />}
      >
        <Radio.Group className="primary-radio-button" defaultValue="a" buttonStyle="solid">
          <Radio.Button value="a">10%</Radio.Button>
          <Radio.Button value="b">15%</Radio.Button>
          <Radio.Button value="c">Otro</Radio.Button>
        </Radio.Group>
      </PaymentCard>

      <PaymentCard
        title="Propina"
        // icon={<MpCashIcon width={'2rem'} height={'2rem'} />}
        icon={<img src="https://cdn.zeplin.io/5dbafce86c01177439541bdd/assets/1A195942-41E6-4883-BBDC-09C590E9FA8F.svg" />}
      >
        <Radio.Group className="primary-radio-button" defaultValue="a" buttonStyle="solid">
          <Radio.Button value="a">Sin datos</Radio.Button>
          <Radio.Button value="b">Con datos</Radio.Button>
        </Radio.Group>
        <CustomerData />
      </PaymentCard>

    </>
  );
};

const CustomerData = ({ hook }) => {
  const [ownerState, setOwnerState] = useState({
    owner: '',
    description: '',
  });

  const handleChange = (e) => setOwnerState({
    ...ownerState,
    [e.target.name]: [e.target.value],
  });

  return (
    <>
      <p></p>
      <Row gutter={8}>
        <Col span={8}>
          <Input size="large" placeholder="Identificacíon" />
        </Col>
        <Col span={8}>
          <Input size="large" placeholder="Nombre" />
        </Col>
      </Row>
      <p></p>
      <Row gutter={8}>
        <Col span={8}>
          <Input size="large" placeholder="Teléfono" />
        </Col>
        <Col span={8}>
          <Input size="large" placeholder="Correo Electrónico" />
        </Col>
      </Row>
      <p></p>
      <Row>
        <Col span={16}>
          <Input size="large" placeholder="Dirección" />
        </Col>
      </Row>
    </>
  );
};

const CardIcon = ({ name = '' }) => {
  name = name.toUpperCase();

  if (name.includes('VISA')) {
    return <MpVisaIcon width={'3rem'} height={'3rem'} />
  }

  if (name.includes('MASTER')) {
    return <MpMasterCardIcon width={'3rem'} height={'3rem'} />
  }

  if (name.includes('AMEX')) {
    return <MpAmexIcon width={'3rem'} height={'3rem'} />
  }

  if (name.includes('CLIP')) {
    return <MpClipIcon width={'3rem'} height={'3rem'} />
  }

  if (name.includes('DINERS')) {
    return <MpDinersClubIcon width={'3rem'} height={'3rem'} />
  }

  return <MpCashIcon width={'3rem'} height={'3rem'} />
};

export default Payment;