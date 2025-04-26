/** @format */

'use client';
import { useEffect, useState } from 'react';
import TradingviewChart from '../../components/TradingviewChart.js';
import useTradingViewLogic from '../../utlities/tradingViewLogic';
import useDateUtils from '../../utlities/dateUtils';

const TradingViewSection = ({
  stocksList = [],
  initialStockTicker = 'AAPL',
  initialTitle = 'Apple Inc / BTC',
}) => {
  // Initialize our utility hooks
  const tradingViewLogic = useTradingViewLogic();
  const dateUtils = useDateUtils();

  // Get date ranges
  const { formatted: currentDateFormat } = dateUtils.getCurrentDate();
  const dateRanges = dateUtils.getDateRanges();

  // State variables
  const [selectedStockTicker, setSelectedStockTicker] =
    useState(initialStockTicker);
  const [selectedCurrencyTicker, setSelectedCurrencyTicker] =
    useState('BTCUSD');
  const [title, setTitle] = useState(initialTitle);
  const [selectedTimespan, setSelectedTimespan] = useState('day');
  const [startDate, setStartDate] = useState(dateRanges.oneYearAgo);
  const [endDate, setEndDate] = useState(currentDateFormat);

  // Data states
  const [stockData, setStockData] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Currency list
  const currencyList = [
    { symbol: 'BTCUSD', name: 'USD / BTC' },
    { symbol: 'BTCAUD', name: 'AUD / BTC' },
    { symbol: 'BTCEUR', name: 'EUR / BTC' },
    { symbol: 'BTCGBP', name: 'GBP / BTC' },
    { symbol: 'BTCJPY', name: 'JPY / BTC' },
    { symbol: 'ETHBTC', name: 'ETH / BTC' },
    { symbol: 'BNBBTC', name: 'BNB / BTC' },
    { symbol: 'LTCBTC', name: 'LTC / BTC' },
    { symbol: 'BTCDOGE', name: 'DOGE / BTC' },
    { symbol: 'XRPBTC', name: 'XRP / BTC' },
  ];

  // Fetch stock and currency data
  useEffect(() => {
    const getStockData = async () => {
      const data = await tradingViewLogic.fetchStockData(
        selectedStockTicker,
        selectedTimespan,
        startDate,
        endDate
      );
      setStockData(data);
    };

    const getCurrencyData = async () => {
      const data = await tradingViewLogic.fetchCurrencyData(
        selectedCurrencyTicker,
        selectedTimespan,
        startDate,
        endDate
      );
      setCurrencyData(data);
    };

    getStockData();
    getCurrencyData();
  }, [
    startDate,
    endDate,
    selectedStockTicker,
    selectedTimespan,
    selectedCurrencyTicker,
  ]);

  // Merge chart data
  useEffect(() => {
    const mergedData = tradingViewLogic.mergeStockAndCurrencyData(
      stockData,
      currencyData,
      selectedTimespan
    );
    setChartData([...mergedData]);
  }, [stockData, currencyData, selectedTimespan]);

  // Set date range based on period button
  const setDateRangeByPeriod = (period) => {
    const range = dateUtils.setDateRangeByPeriod(period);
    setStartDate(range.startDate);
    setEndDate(range.endDate);
  };

  return (
    <div className='bg-background text-foreground'>
      <TradingviewChart
        chartData={chartData}
        selectedTimespan={selectedTimespan}
        title={title}
        TopTitle='Stocks : '
        stocksList={stocksList}
        seletedStockTicker={selectedStockTicker}
        setSeletedStockTicker={(e) => setSelectedStockTicker(e)}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setDateRangeByPeriod={setDateRangeByPeriod}
        currencyList={currencyList}
        selectedCurrencyTicker={selectedCurrencyTicker}
        setSelectedCurrencyTicker={(e) => setSelectedCurrencyTicker(e)}
      />
    </div>
  );
};

export default TradingViewSection;
