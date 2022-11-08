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
    if (fromCurrency == props.toCurrency) {
      toAmount = amount * exchangeRate;
    } else {
      toAmount = (amount * exchangeRate).toFixed(3);
    }
  } else {
    toAmount = amount;
    if (fromCurrency == props.toCurrency) {
      fromAmount = amount / exchangeRate;
    } else {
      fromAmount = (amount / exchangeRate).toFixed(3);
    }
  }

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  };

  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  };

  const reverseCurrencies = () => {
    setFromCurrency(props.toCurrency);
    props.setToCurrency(fromCurrency);
  };

  return (
    <div className="converter">
      <CurrencyRow
        currencyOptions={filteredCurrencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.textContent)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
        firstDropDown
      />
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={reverseCurrencies}
        className="reverse-icon">
        <circle cx="16" cy="16" r="16" fill="#433B6D" />
        <path
          d="M19.4286 26L24 21.5556L20.5714 21.5556L20.5714 13.7778L18.2857 13.7778L18.2857 21.5556L14.8571 21.5556M17.1429 10.4444L12.5714 6L8 10.4444L11.4286 10.4444L11.4286 18.2222L13.7143 18.2222L13.7143 10.4444L17.1429 10.4444Z"
          fill="white"
        />
      </svg>
      <CurrencyRow
        currencyOptions={filteredCurrencyOptions}
        selectedCurrency={props.toCurrency}
        onChangeCurrency={(e) => props.setToCurrency(e.target.textContent)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </div>
  );
};

export default Converter;
