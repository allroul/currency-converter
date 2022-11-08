import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const AddNewCurrency = (props) => {
  const { addNewCurrency } = props;
  const { allCurrencyRates } = useSelector((state) => state.rates);
  const [searchValue, setSearchValue] = useState('');
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
  const addNewDropDown = useRef();
  const readyRef = addNewDropDown.current;

  const searchOnChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      if (dropDownIsOpen == true && !readyRef.contains(e.target)) {
        setDropDownIsOpen(!dropDownIsOpen);
      }
    });
  }, [dropDownIsOpen]);

  const readyToShowOptions = Object.keys(allCurrencyRates)
    .filter((item) => item.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item, index) => {
      return (
        <li
          className="dropdown-item"
          key={index}
          onClick={(e) => {
            setDropDownIsOpen(false);
            addNewCurrency(e.target.textContent);
            setSearchValue('');
          }}>
          {item}
        </li>
      );
    });

  return (
    <div className="add-new-wrapper">
      <h2 className="add-new-title">Interested in different currency?</h2>
      <div
        ref={addNewDropDown}
        className={
          dropDownIsOpen == true
            ? 'custom-dropdown custom-dropdown_add-new open'
            : 'custom-dropdown custom-dropdown_add-new'
        }>
        <div className="active-option_add-new" onClick={() => setDropDownIsOpen(!dropDownIsOpen)}>
          Add new currency
        </div>
        <div className="dropdown-hidden">
          <h2 className="dropdown-title">Select currency</h2>
          <div className="search-wrapper">
            <input placeholder="Search..." value={searchValue} onChange={searchOnChange} />
            <img className="search-img" alt="search" src="currency-converter/search.png" />
          </div>
          <ul className="dropdown-content">{readyToShowOptions}</ul>
        </div>
      </div>
    </div>
  );
};

export default AddNewCurrency;
