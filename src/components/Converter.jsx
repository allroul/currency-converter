import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CurrencyRow from './CurrencyRow';
import { requestOptions, requestUrl } from './FetchSettings';

const Converter = (props) => {
  const { filteredCurrencyOptions, rates } = useSelector((state) => state.rates);
  const { status } = useSelector((state) => state.rates);
  const [fromCurrency, setFromCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  useEffect(() => {
    const baseCurrency = filteredCurrencyOptions[0];
    const firstCurrency = filteredCurrencyOptions[1];
    setFromCurrency(baseCurrency);
    props.setToCurrency(firstCurrency);
    setExchangeRate(rates[baseCurrency]);
  }, [status]);

  useEffect(() => {
    if (fromCurrency !== undefined && props.toCurrency !== undefined) {
      fetch(`${requestUrl}?symbols=${props.toCurrency}&base=${fromCurrency}`, requestOptions)
        .then((response) => response.json())
        .then((data) => setExchangeRate(data.rates[props.toCurrency]));
    }
  }, [fromCurrency, props.toCurrency, filteredCurrencyOptions]);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  };

  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  };

  return (
    <div className="converter">
      <CurrencyRow
        currencyOptions={filteredCurrencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <CurrencyRow
        currencyOptions={filteredCurrencyOptions}
        selectedCurrency={props.toCurrency}
        onChangeCurrency={(e) => props.setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </div>
  );
};

export default Converter;
