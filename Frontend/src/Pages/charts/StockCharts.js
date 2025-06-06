import React from 'react'
import NavbarCompo from '../../components/Navbar';
import TradingViewWidget from '../../components/ChartCompo/TradingViewWidget';

export const StockCharts = () => {
  return (
    <>
      <NavbarCompo />
      <TradingViewWidget symbol="NSE:TCS" />
    </>
  )
}
