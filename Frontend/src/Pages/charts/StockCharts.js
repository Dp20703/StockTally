import React from 'react'
import NavbarCompo from '../../components/Navbar';
import TradingViewWidget from '../../components/ChartCompo/TradingViewWidget';

export const StockCharts = () => {
  return (
    <>
      <div id="dashboard" className='overflow-x-auto'>
        <NavbarCompo />
        <TradingViewWidget />
      </div>
    </>
  )
}
