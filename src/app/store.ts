import { configureStore } from '@reduxjs/toolkit';
import allStockReducer from '../features/stockList/stockListSlice';
import trendChartSlice from '../features/trendChart/trendChartSlice';

const store = configureStore({
  reducer: {
    all_stocks: allStockReducer,
    history: trendChartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
