import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Radio, Input } from 'antd';

const PaymentRadioButton = ({ options, value: { value, radioValue }, defaultValue, customValue, hook, type = 'number' }) => {

  const inputRef = useRef('');
  const CUSTOM = useMemo(() => 'CUSTOM');
  const [inputValue, setInputValue] = useState(value);
  const isCustom = radioValue === CUSTOM;

  const onChange = (e) => {
    const val = e.target.value;

    if (type === 'number') {
      const v = val !== CUSTOM ? val : 0;
      hook({ value: v, radioValue: val, isCustom });
    } else {
      hook({ value: val, radioValue: val, isCustom });
    }
  };

  const onChangeInput = (e) => {
    let val = e.target.value;

    if (type === 'number' && val) {
      const numberRegex = /^\d{1,}(\.\d{0,2})?$/;
      const valid = !val || numberRegex.test(val);

      if (valid) {
        hook({ value: val, radioValue, isCustom });
        setInputValue(val);
      }
    } else {
      hook({ value: val, radioValue, isCustom });
      setInputValue(val);
    }
  };

  useEffect(() => {
    if (isCustom) inputRef.current.focus();
  }, [isCustom]);

  return (
    <div className="payment-radio-button">
      <Radio.Group className="primary-radio-button" buttonStyle="solid" defaultValue={defaultValue} value={radioValue} onChange={onChange}>
        {options.map(option => <Radio.Button key={option.key} value={option.key}>{option.value}</Radio.Button>)}
        {customValue && !isCustom && <Radio.Button value={CUSTOM}>Otro</Radio.Button>}
      </Radio.Group>
      {isCustom && <Input ref={inputRef} value={inputValue} placeholder="Custom" className="payment-radio-button-input" onChange={onChangeInput} />}
    </div>
  );
};

export { PaymentRadioButton };