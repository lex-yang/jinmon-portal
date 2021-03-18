import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';

import {
  View,
} from 'react-native';

import {
  selectTradeHistory,
  fetchTradeHistory,
} from './trendChartSlice';

import Chart from './Chart';

export const TrendChart = (props: { id: string }) => {
  const trendData = useSelector((state: RootState) => selectTradeHistory(state, props.id));
  const [ data, setData ] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (trendData === undefined) dispatch(fetchTradeHistory(props.id));
  }, [trendData, dispatch, props.id ]);

  if (trendData && data == null) {
    const d = JSON.parse(JSON.stringify(trendData));
    d.forEach((v: any) => v.date = new Date(v.date));
    setData(d);
  }
  return (
    ( trendData === undefined ? null : <Chart data={data} /> )
  );
}
