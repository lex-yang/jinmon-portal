import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { AppThunk } from '../../app/types';

import { Stock } from '@yanglex/data-types';

import { RESTfulConnector } from '@yanglex/data-connector';

const restfulConnector = new RESTfulConnector<Stock>('stocks', Stock.redisConverter);

export const allStockSlice = createSlice({
  name: 'all_stocks',
  initialState: {
    list: null,
  },
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setList } = allStockSlice.actions;

export const refreshList = () : AppThunk => async dispatch => {
  restfulConnector.Query('id')
    .then((data: any) => {
      dispatch(setList(data));
    })
    .catch((error: any) => {
      console.error(error.toString());
    });
};

export const selectList = (state: RootState) => state.all_stocks.list;

export default allStockSlice.reducer;
