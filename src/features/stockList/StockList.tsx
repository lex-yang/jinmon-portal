import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectList,
  refreshList,
} from './stockListSlice';

import { PagingTable, TableField } from '@yanglex/web-ui';

const fields: TableField[] = [
  {
    key: 'id',
    name: '代碼',
  },
  {
    key: 'name',
    name: '公司名稱',
  },
];

export const StockList = () => {
  const stockList = useSelector(selectList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (stockList == null) dispatch(refreshList());
  });

  return (
    <PagingTable
      title='股票清單'
      source={stockList}
      fields={fields}
      limit={20}
      paging={true}
      searchBar={true}
      hideHeader={false}
      hideFooter={false}
      onSelectItem={item => {
        console.log(item.toString());
      }}
    />
  );
}
