import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { AppThunk } from '../../app/types';

import { TradeData } from '@yanglex/data-types';

import { RESTfulConnector, IDictionary } from '@yanglex/data-connector';

const restfulConnector = new RESTfulConnector<TradeData>('history', TradeData.redisConverter);

const historyCache: IDictionary<any> = {};

export const trendChartSlice = createSlice({
  name: 'history',
  initialState: {
    cache: historyCache,
  },
  reducers: {
    setHistory: (state, action) => {
      const id = action.payload.stockId;
      const newCache = Object.assign({}, historyCache);
      newCache[id] = action.payload.history;
      state.cache = newCache;
    },
  },
});

export const { setHistory } = trendChartSlice.actions;

export const fetchTradeHistory = (id: string) : AppThunk => async dispatch => {
  restfulConnector.rootPath = id;

  restfulConnector.Query('date')
    .then((data: TradeData[]) => {
      let unwrapped: any = JSON.parse(JSON.stringify(data));
      console.log(`${typeof data}`);
      for (let i = unwrapped.length - 1; i >= 0; i --) {
        const date = unwrapped[i].date;
        unwrapped[i].date = date.substr(0, 10);
      }
      //console.log(JSON.stringify(unwrapped));
      return unwrapped;
    })
    .then((history: any) => {
      dispatch(setHistory({ history: history, stockId: id }));
    })
    .catch((error: any) => {
      console.error(error.toString());
    });
};

export const selectTradeHistory = (state: RootState, id: string) => state.history.cache[id];

export default trendChartSlice.reducer;
