import React from 'react';
import { useSelector } from 'react-redux';

const AddNewCurrency = (props) => {
  const { allCurrencyRates } = useSelector((state) => state.rates);
  return (
    <div className="add-new-wrapper">
      <h2 className="add-new-title">Interested in different currency?</h2>
      <select
        className="add-new-btn select"
        value="Add new currency"
        onChange={(e) => {
          props.addNewCurrency(e.target.value);
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
  );
};

export default AddNewCurrency;
