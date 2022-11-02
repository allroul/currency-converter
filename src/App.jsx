import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import CurrencyRow from './CurrencyRow';
import { fetchRates, addCurrency } from './store/ratesSlice';

function App() {
  const dispatch = useDispatch();
  const { allCurrencyRates, filteredCurrencyOptions, rates } = useSelector((state) => state.rates);
  const { status } = useSelector((state) => state.rates);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let myHeaders = new Headers();
  myHeaders.append('apikey', 'PlITwWgLMKTURa33gZ50dqZVaFfDzn4h');
  let requestUrl = 'https://api.apilayer.com/exchangerates_data/latest';

  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };

  useEffect(() => {
    dispatch(fetchRates());
  }, [dispatch]);

  useEffect(() => {
    const baseCurrency = filteredCurrencyOptions[0];
    const firstCurrency = filteredCurrencyOptions[1];
    setFromCurrency(baseCurrency);
    setToCurrency(firstCurrency);
    setExchangeRate(rates[baseCurrency]);
  }, [filteredCurrencyOptions]);

  useEffect(() => {
    if (fromCurrency !== undefined && toCurrency !== undefined) {
      fetch(`${requestUrl}?symbols=${toCurrency}&base=${fromCurrency}`, requestOptions)
        .then((response) => response.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency, filteredCurrencyOptions]);

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

  const addNewCurrency = (option) => {
    dispatch(addCurrency(option));
    setToCurrency(option);
  };

  return (
    <div className="wrapper">
      <div className="content">
        <h1 className="main-title">Currency Converter</h1>
        {status === 'loading' ? (
          <h2 className="loading-title">Loading...</h2>
        ) : (
          <>
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
                selectedCurrency={toCurrency}
                onChangeCurrency={(e) => setToCurrency(e.target.value)}
                onChangeAmount={handleToAmountChange}
                amount={toAmount}
              />
            </div>
            <div className="add-new-wrapper">
              <h2 className="add-new-title">Interested in different currency?</h2>
              <select
                className="add-new-btn select"
                value="Add new currency"
                onChange={(e) => {
                  addNewCurrency(e.target.value);
                }}>
                <option disabled hidden value="Add new currency">
                  Add new currency
                </option>
                {Object.keys(allCurrencyRates).map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
