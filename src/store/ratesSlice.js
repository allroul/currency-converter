import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

let myHeaders = new Headers();
myHeaders.append('apikey', 'PlITwWgLMKTURa33gZ50dqZVaFfDzn4h');
let requestUrl = 'https://api.apilayer.com/exchangerates_data/latest';

let requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders,
};

export const fetchRates = createAsyncThunk(
  'rates/fetchRates',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(requestUrl, requestOptions);

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      const data = response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const ratesSlice = createSlice({
  name: 'rates',
  initialState: {
    allCurrencyRates: {},
    filteredCurrencyOptions: [],
    rates: [],
    status: null,
    error: null,
  },
  reducers: {
    addCurrency(state, action) {
      let currentCurrency = action.payload;
      let currentCurrencyRate = state.allCurrencyRates[currentCurrency];
      state.rates.currentCurrency = currentCurrencyRate;
      state.filteredCurrencyOptions.push(currentCurrency);
      let temporaryRates = state.allCurrencyRates;
      delete temporaryRates[currentCurrency];
      let updatedRated = { ...temporaryRates };
      state.allCurrencyRates = updatedRated;
    },
  },
  extraReducers: {
    [fetchRates.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchRates.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.error = null;
      state.allCurrencyRates = action.payload.rates;
      state.filteredCurrencyOptions = Object.keys(action.payload.rates).filter(
        (item) => item === 'EUR' || item === 'USD' || item === 'UAH' || item === 'PLN',
      );
      const rates = Object.keys(action.payload.rates)
        .filter((key) => key === 'EUR' || key === 'USD' || key === 'UAH' || key === 'PLN')
        .reduce((obj, key) => {
          return Object.assign(obj, {
            [key]: action.payload.rates[key],
          });
        }, {});
      state.rates = rates;
    },
    [fetchRates.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { addCurrency } = ratesSlice.actions;

export default ratesSlice.reducer;
