import React, { useContext, useEffect, useState, useReducer } from 'react';
import { Row, Col, Card, Button, Radio, Divider, Input } from 'antd';
import { MpCashIcon, MpVisaIcon, MpAmexIcon, MpMasterCardIcon, MpDinersClubIcon, MpClipIcon, MpRappiIcon } from '../icon';
import PaymentLayout from '../components/layouts/PaymentLayout';
import { PaymentRadioButton } from '../components/global/PaymentRadioButton';
import { Store } from '../config/store';
import { fetchCards, fetchNextBillingNumber, fetchPreOrder, fetchSuggestions, createOrderSplit } from '../actions/payment';
import { centsToMoney, money } from '../helper/formatter';
import moment from 'moment-timezone';
import _ from 'lodash';

const TABS = {
  NORMAL: 'NORMAL',
  SPLIT_PAYMENT: 'SPLIT_PAYMENT',
  SPLIT_ACCOUNT: 'SPLIT_ACCOUNT',
  DISCOUNT: 'DISCOUNT'
};

const TOTAL = 'TOTAL';

const CUSTOMER_DATA = {
  CUSTOMER: 'CUSTOMER',
  NO_CUSTOMER: 'NO_CUSTOMER'
};

const Payment = () => {
  const { state, dispatch } = useContext(Store);
  const { preorder = {} } = state;

  const {
    summary: { total = 0 } = {},
    details
  } = preorder;

  const [paymentState, paymentDispatch] = useReducer(paymentReducer, paymentInitialState);

  const [activeTab, setActiveTab] = useState(TABS.NORMAL);
  const [cardType, setCardType] = useState(CARD_TYPES.CREDIT);
  const [cardState, onSetCardState] = useState({});
  const [discount, setDiscount] = useState({});
  const [tip, setTip] = useState({});
  const [customer, setCustomer] = useState(CUSTOMER_DATA.NO_CUSTOMER);
  const [customerData, setCustomerData] = useState({});
  const [normalOtherPayment, setNormalOtherPayment] = useState(false);
  const [foodService, setFoodService] = useState(false);

  const onSwitchActiveTab = (tab) => setActiveTab(tab);

  const onSetPaymentValue = ({ type, paymentType }) =>
    (payload) => {
      paymentDispatch({ type, paymentType, payload });
      onSetCardState({});
    };

  const onSetCardValue = (val) => {
    onSetCardState(val);
  };

  const totalValid = total !== 0 ? total : 1;
  const fTip = tip.isCustom ? ((tip.value || 0) * 100) : (parseFloat(tip.value || 0) / 100) * totalValid;
  const fDiscount = discount.isCustom ? parseFloat(discount.value || 0) * 100 : (parseFloat(discount.value || 0) / 100) * totalValid;
  const fDiscountPercentage = discount.isCustom ? ((parseFloat(discount.value || 0) * 100) / totalValid) * 100 : discount.value || 0;
  const finalTotal = total - fDiscount + fTip;

  let received = Object.keys(PaymentTypes).reduce((prev, key) => {
    let val = paymentState[key].value;
    let qty;

    if (val === TOTAL)
      qty = finalTotal;
    else
      qty = parseFloat(paymentState[key].value || 0) * 100;

    return prev + qty;
  }, 0);

  if (cardState.value) {
    received += finalTotal;
  }

  const onSwitchNormalOtherPayment = () => {
    setNormalOtherPayment(val => !val);
  };

  const onSwitchFoodService = () => {
    setFoodService(val => !val);
  };

  const getPaymentFormat = (name, state, total = 0) => {
    if (!state[name].value) return;
    let val;

    if (state[name].isCustom) {
      val = state[name].value;
    } else if (state[name].value === 'TOTAL') {
      val = total;
    } else {
      val = state[name].value * 100;
    }

    return {
      total: val,
      type: PAYMENT_TYPE[name]
    }
  };

  const getCardFormat = (value, cardType, cardNumber, total = 0) => {
    if (_.isEmpty(value)) return;
    let type;

    if (cardType === CARD_TYPES.CREDIT)
      type = PAYMENT_TYPE.credit;

    if (cardType === CARD_TYPES.DEBIT)
      type = PAYMENT_TYPE.debit;

    return {
      card_id: value.value,
      total,
      card_last_digits: cardNumber,
      type
    }
  };

  const onCreateNormalOrder = () => {
    let { name, phone, email, address, ruc } = customerData;
    let hasCustomer = customer === CUSTOMER_DATA.CUSTOMER;

    let cash = getPaymentFormat('cash', paymentState, finalTotal);
    let transfer = getPaymentFormat('transfer', paymentState, finalTotal);
    let other = getPaymentFormat('other', paymentState, finalTotal);
    let rappiPay = getPaymentFormat('rappiPay', paymentState, finalTotal);
    let card = getCardFormat(cardState, cardType, '', finalTotal);
    let payments = [cash, transfer, other, rappiPay, card].filter(_ => !!_);

    let order = {
      current_status: "Creada",
      nameStatus: "En proceso",
      billing_address: hasCustomer ? address : null,
      billing_phone: hasCustomer ? phone : null,
      billing_email: hasCustomer ? email : null,
      billing_name: hasCustomer ? name : null,
      billing_document: hasCustomer ? ruc : null,
      order_value: finalTotal,
      spot_id: 104,
      date_time: moment().format('YYYY-MM-DD HH:mm:ss'),
      cash: !!paymentState.cash.value,
      change_value: finalTotal - received,
      payments,
      has_billing: hasCustomer,
      direccion: address,
      phone,
      email: email || '',
      nombre: name || 'CONSUMIDOR FINAL',
      ruc: ruc || '9999999999',
      address: address || '',
      food_service: foodService,
      order_details: details,
      discount_value: fDiscount,
      discount_percentage: fDiscountPercentage,
      invoice_number: 20012,
      tip: fTip,
      people: 1,
      custom_identifier: ruc,
      employee_id: 4
    };

    createOrderSplit(dispatch, order);
  };


  useEffect(() => {
    fetchCards(dispatch);
    fetchNextBillingNumber(dispatch);
    fetchPreOrder(dispatch);
  }, []);

  useEffect(() => {
    if (preorder) {
      fetchSuggestions(dispatch, centsToMoney(finalTotal));
    };
  }, [preorder, finalTotal]);

  return (
    <>
      <PaymentLayout
        activeTab={activeTab}
        onSwitchActiveTab={onSwitchActiveTab}
        normalOtherPayment={normalOtherPayment}
        onSwitchNormalOtherPayment={onSwitchNormalOtherPayment}
        foodService={foodService}
        onSwitchFoodService={onSwitchFoodService}
        nextBillingNumber={state.nextBillingNumber}
        discount={discount}
      >

        <Resume subtotal={finalTotal} received={received} />

        {
          activeTab === TABS.NORMAL &&
          <NormalPaymentTab
            total={finalTotal}
            paymentState={paymentState}
            onSetPaymentValue={onSetPaymentValue}
            cardType={cardType}
            setCardType={setCardType}
            cardState={cardState}
            onSetCardValue={onSetCardValue}
            normalOtherPayment={normalOtherPayment}
            tip={tip}
            setTip={setTip}
            customer={customer}
            setCustomer={setCustomer}
            customerData={customerData}
            setCustomerData={setCustomerData}
            onCreateOrder={onCreateNormalOrder}
          />
        }

        {
          activeTab === TABS.DISCOUNT &&
          <DiscountTab
            discount={discount}
            hook={setDiscount}
          />
        }

      </PaymentLayout>
    </>
  );
};

const Resume = ({ subtotal = 0, received = 0 }) => {
  const toReturn = received - subtotal;

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

const NormalPaymentTab = ({
  total,
  normalOtherPayment,
  paymentState,
  onSetPaymentValue,
  cardType,
  setCardType,
  cardState,
  onSetCardValue,
  tip,
  setTip,
  customer,
  setCustomer,
  customerData,
  setCustomerData,
  onCreateOrder
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
                total={total}
                normalOtherPayment={normalOtherPayment}
                paymentState={paymentState}
                onSetPaymentValue={onSetPaymentValue}
                cardType={cardType}
                setCardType={setCardType}
                cardState={cardState}
                onSetCardValue={onSetCardValue}
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
              <NormalPaymentStepTwo
                tip={tip}
                setTip={setTip}
                customer={customer}
                setCustomer={setCustomer}
                customerData={customerData}
                setCustomerData={setCustomerData}
              />
              <Row type="flex" justify="center">
                <Button className="tertiary-button payment-button" type="primary" onClick={onStepOne}>
                  Regresar
                </Button>
                <Button className="primary-button payment-button" type="primary" onClick={onCreateOrder}>
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

const PAYMENT_TYPE = {
  cash: 0,
  debit: 1,
  credit: 2,
  transfer: 3,
  other: 4,
  rappyPay: 5
}

const paymentInitialState = {
  cash: {},
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
  transfer: 'transfer',
  other: 'other',
  rappiPay: 'rappiPay'
};

const CARD_TYPES = {
  CREDIT: 'CREDIT',
  DEBIT: 'DEBIT'
};

const NormalPaymentStepOne = ({
  total,
  normalOtherPayment,
  paymentState,
  onSetPaymentValue,
  cardType,
  setCardType,
  cardState,
  onSetCardValue
}) => {

  const { state, dispatch } = useContext(Store);

  const {
    cards,
    suggestions = []
  } = state;

  const [shownCards, setShownCards] = useState([]);

  const onChangeCardType = (e) => {
    let value = e.target.value;
    setCardType(value);
  };

  const onChangeCard = (e) => {
    let val = e.target.value;
    onSetPaymentValue({ type: 'SET_VALUE_AND_CLEAN', paymentType: '' })();
    onSetCardValue({ value: val });
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
              options={[...[{ key: TOTAL, value: money(centsToMoney(total)) }], ...newSuggestions]}
              customValue
              hook={onSetPaymentValue({ type: 'SET_VALUE_AND_CLEAN', paymentType: PaymentTypes.cash })}
            />
          </PaymentCard>

          <PaymentCard title="Tarjeta" icon={<MpVisaIcon width="2rem" height="2rem" />} >
            <Radio.Group className="primary-radio-button" value={cardState.value} defaultValue={""} buttonStyle="solid" onChange={onChangeCard}>
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
              <Col>
                <div className="payment-card-type-row">
                  <Radio.Group className="primary-radio-button" buttonStyle="solid" onChange={onChangeCardType} value={cardType} defaultValue={CARD_TYPES.CREDIT}>
                    <Radio.Button value={CARD_TYPES.CREDIT}>Crédito</Radio.Button>
                    <Radio.Button value={CARD_TYPES.DEBIT}>Débito</Radio.Button>
                  </Radio.Group>
                  {cardState.value && <Input className="card-type-row-voucher" size="large" placeholder="Voucher" />}
                </div>
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
              hook={onSetPaymentValue({ type: 'SET_VALUE_AND_CLEAN', paymentType: PaymentTypes.transfer })}
            />
          </PaymentCard>

          <PaymentCard
            title="Otro"
            // icon={<MpCashIcon width={'2rem'} height={'2rem'} />}
            icon={<img src="https://cdn.zeplin.io/5dbafce86c01177439541bdd/assets/FCCD457F-EF61-4369-92C3-06F47053FE82.svg" />}
          >
            <PaymentRadioButton
              value={paymentState.other}
              options={[{ key: TOTAL, value: money(centsToMoney(total)) }]}
              customValue
              hook={onSetPaymentValue({ type: 'SET_VALUE_AND_CLEAN', paymentType: PaymentTypes.other })}
            />
          </PaymentCard>

          <PaymentCard title="Rappi Pay" icon={<MpRappiIcon width="2rem" height="2rem" />} >
            <PaymentRadioButton
              value={paymentState.rappiPay}
              options={[{ key: TOTAL, value: money(centsToMoney(total)) }]}
              customValue
              hook={onSetPaymentValue({ type: 'SET_VALUE_AND_CLEAN', paymentType: PaymentTypes.rappiPay })}
            />
          </PaymentCard>

        </>
      }
    </>
  );
};

const NormalPaymentStepTwo = ({
  tip,
  setTip,
  customer,
  setCustomer,
  customerData,
  setCustomerData
}) => {

  const onSwitchCustomer = (e) => {
    let val = e.target.value;
    setCustomer(val);
  };

  return (
    <>
      <PaymentCard
        title="Propina"
        icon={<MpCashIcon width="2rem" height="2rem" />}
      >
        <PaymentRadioButton
          value={tip}
          options={[{ key: 10, value: '10%' }, { key: 15, value: '15%' }]}
          customValue
          hook={setTip}
        />
      </PaymentCard>

      <PaymentCard
        title="Propina"
        // icon={<MpCashIcon width={'2rem'} height={'2rem'} />}
        icon={<img src="https://cdn.zeplin.io/5dbafce86c01177439541bdd/assets/1A195942-41E6-4883-BBDC-09C590E9FA8F.svg" />}
      >
        <Radio.Group className="primary-radio-button" buttonStyle="solid" value={customer} defaultValue={CUSTOMER_DATA.NO_CUSTOMER} onChange={onSwitchCustomer}>
          <Radio.Button value={CUSTOMER_DATA.NO_CUSTOMER}>Sin datos</Radio.Button>
          <Radio.Button value={CUSTOMER_DATA.CUSTOMER}>Con datos</Radio.Button>
        </Radio.Group>
        {customer === CUSTOMER_DATA.CUSTOMER && <CustomerData data={customerData} hook={setCustomerData} />}
      </PaymentCard>

    </>
  );
};

const CustomerData = ({ data, hook }) => {

  const handleChange = (e) => hook({
    ...data,
    [e.target.name]: e.target.value,
  });

  return (
    <>
      <p></p>
      <Row gutter={8}>
        <Col span={8}>
          <Input size="large" placeholder="Identificacíon" name="ruc" value={data.ruc} onChange={handleChange} />
        </Col>
        <Col span={8}>
          <Input size="large" placeholder="Nombre" name="name" value={data.name} onChange={handleChange} />
        </Col>
      </Row>
      <p></p>
      <Row gutter={8}>
        <Col span={8}>
          <Input size="large" type="phone" placeholder="Teléfono" name="phone" value={data.phone} onChange={handleChange} />
        </Col>
        <Col span={8}>
          <Input size="large" type="email" placeholder="Correo Electrónico" name="email" value={data.email} onChange={handleChange} />
        </Col>
      </Row>
      <p></p>
      <Row>
        <Col span={16}>
          <Input size="large" placeholder="Dirección" name="address" value={data.address} onChange={handleChange} />
        </Col>
      </Row>
    </>
  );
};

const CardIcon = ({ name = '' }) => {
  const nameRegex = name.toUpperCase();

  if (nameRegex.includes('VISA')) {
    return <MpVisaIcon width={'3rem'} height={'3rem'} />
  }

  if (nameRegex.includes('MASTER')) {
    return <MpMasterCardIcon width={'3rem'} height={'3rem'} />
  }

  if (nameRegex.includes('AMEX')) {
    return <MpAmexIcon width={'3rem'} height={'3rem'} />
  }

  if (nameRegex.includes('CLIP')) {
    return <MpClipIcon width={'3rem'} height={'3rem'} />
  }

  if (nameRegex.includes('DINERS')) {
    return <MpDinersClubIcon width={'3rem'} height={'3rem'} />
  }

  if (nameRegex.includes('DISCOVER')) {
    return <div>Discover</div>
  }

  return <div>{name}</div>
};

const DiscountTab = ({ discount, hook }) => {

  return (
    <Row className="payment-method-wrapper" type="flex" justify="center">
      <Col span={18}>
        <PaymentCard title="Descuento"
          // icon={<MpRappiIcon width="2rem" height="2rem" />}
          icon={<img className="header-radio-img" src="https://cdn.zeplin.io/5dbafce86c01177439541bdd/assets/847F6231-6BF8-4584-B69D-B6AF194AE2D7.svg" />}
        >
          <PaymentRadioButton
            value={discount}
            options={[{ key: 10, value: '10%' }, { key: 15, value: '15%' }]}
            customValue
            hook={hook}
          />
        </PaymentCard>
      </Col>
    </Row>
  );
};

export default Payment;