import { configureStore } from '@reduxjs/toolkit';
import ratesSlice from './ratesSlice';

export default configureStore({
  reducer: {
    rates: ratesSlice,
  },
});
