import React, { useState } from 'react';

function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount,
    firstDropDown,
  } = props;
  const [searchValue, setSearchValue] = useState('');
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);

  const searchOnChange = (event) => {
    setSearchValue(event.target.value);
  };

  const readyToShowOptions = currencyOptions
    .filter((item) => item.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item, index) => {
      return (
        <li
          className="dropdown-item"
          key={index}
          onClick={(e) => {
            onChangeCurrency(e);
            setDropDownIsOpen(false);
          }}>
          {item}
        </li>
      );
    });

  return (
    <div className="currency-row">
      <input type="number" className="input" value={amount.toString()} onChange={onChangeAmount} />
      <div
        className={dropDownIsOpen == true ? 'custom-dropdown open' : 'custom-dropdown'}
        style={firstDropDown && { zIndex: '6' }}>
        <div className="active-option" onClick={() => setDropDownIsOpen(!dropDownIsOpen)}>
          {selectedCurrency}
        </div>
        <div className="dropdown-hidden">
          <h2 className="dropdown-title">Select currency</h2>
          <div className="search-wrapper">
            <input placeholder="Search..." value={searchValue} onChange={searchOnChange} />
            <img className="search-img" alt="search" src="search.png" />
          </div>
          <ul className="dropdown-content">{readyToShowOptions}</ul>
        </div>
      </div>
    </div>
  );
}

export default CurrencyRow;
