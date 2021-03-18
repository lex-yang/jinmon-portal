import React from 'react';
import logo from './logo.svg';
import { StockList } from './features/stockList/StockList';
import { TrendChart } from './features/trendChart/trendChart';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <StockList />
        <TrendChart id='AAPL' />
      </header>
    </div>
  );
}

export default App;
