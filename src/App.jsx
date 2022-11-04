import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import AddNewCurrency from './components/AddNewCurrency';
import Converter from './components/Converter';
import { fetchRates, addCurrency } from './store/ratesSlice';

function App() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.rates);
  const [toCurrency, setToCurrency] = useState();

  const addNewCurrency = (option) => {
    dispatch(addCurrency(option));
    setToCurrency(option);
  };

  useEffect(() => {
    dispatch(fetchRates());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <div className="content">
        <h1 className="main-title">Currency Converter</h1>
        {status === 'loading' ? (
          <h2 className="loading-title">Loading...</h2>
        ) : (
          <>
            <Converter toCurrency={toCurrency} setToCurrency={setToCurrency} />
            <AddNewCurrency addNewCurrency={addNewCurrency} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
