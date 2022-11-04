import React from 'react';

function CurrencyRow(props) {
  const { currencyOptions, selectedCurrency, onChangeCurrency, amount, onChangeAmount } = props;
  return (
    <div className="currency-row">
      <input type="number" className="input" value={amount.toString()} onChange={onChangeAmount} />
      <select value={selectedCurrency} className="select" onChange={onChangeCurrency}>
        {currencyOptions.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyRow;
