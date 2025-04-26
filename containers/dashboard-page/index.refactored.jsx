/** @format */

'use client';
import { Datepicker } from 'flowbite-react';
import { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import TradingviewChart from '../../components/TradingviewChart.js';
import useTradingViewLogic from '../../utlities/tradingViewLogic';
import useStocksTableLogic from '../../utlities/stocksTableLogic';
import useDateUtils from '../../utlities/dateUtils';

const DashboardSection = () => {
  // Initialize our utility hooks
  const tradingViewLogic = useTradingViewLogic();
  const stocksTableLogic = useStocksTableLogic();
  const dateUtils = useDateUtils();

  // Get date ranges
  const { formatted: currentDateFormat } = dateUtils.getCurrentDate();
  const dateRanges = dateUtils.getDateRanges();

  // State variables
  const [seletedStockTicker, setSeletedStockTicker] = useState('AAPL');
  const [seletedCurrencyTicker, setSeletedCurrencyTicker] = useState('BTCUSD');
  const [title, setTitle] = useState('Apple Inc / BTC');
  const [selectedTimespan, setSelectedTimespan] = useState('day');
  const [startDate, setStartDate] = useState(dateRanges.oneYearAgo);
  const [endDate, setEndDate] = useState(currentDateFormat);

  // Data states
  const [stockData, setStockData] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [allStockData, setAllStockData] = useState([]);
  const [sevenDayStockData, setSevenDayStockData] = useState([]);
  const [thirtyDayStockData, setThirtyDayStockData] = useState([]);
  const [ninetyDayStockData, setNineDayStockData] = useState([]);
  const [yearyDayStockData, setYearDayStockData] = useState([]);
  const [sortedTableData, setSortedTableData] = useState([]);
  const [oneYearCurrencyData, setOneYearCurrencyData] = useState([]);

  // Stock and currency lists
  const stocksList = useMemo(
    () => [
      { name: 'Apple Inc', symbol: 'AAPL' },
      { name: 'Tesla Inc', symbol: 'TSLA' },
      { name: 'Microsoft Inc', symbol: 'MSFT' },
      { name: 'Nvidia Inc', symbol: 'NVDA' },
      { name: 'Amazon Inc', symbol: 'AMZN' },
      { name: 'Alphabet Inc', symbol: 'GOOGL' },
      { name: 'Meta Inc', symbol: 'META' },
      { name: 'Berkshire Hathaway Inc', symbol: 'BRK.B' },
      { name: 'ExxonMobil Inc', symbol: 'XOM' },
      { name: 'BP Inc', symbol: 'BP' },
      { name: 'Marathon Digital Inc', symbol: 'MARA' },
      { name: 'Microstrategy Inc', symbol: 'MSTR' },
      { name: 'JPMorgan Chase Inc', symbol: 'JPM' },
      { name: 'Goldman Sachs Inc', symbol: 'GS' },
      { name: 'Mastercard Inc', symbol: 'MA' },
      { name: 'Visa Inc', symbol: 'V' },
      { name: 'Disney Inc', symbol: 'DIS' },
      { name: 'LVMH Inc', symbol: 'NKE' },
      { name: 'Pepsi', symbol: 'PEP' },
      { name: 'Coca Cola', symbol: 'KO' },
      { name: 'CSL Inc', symbol: 'CSL' },
      { name: 'TSMC', symbol: 'TSM' },
      { name: 'General Electric', symbol: 'GE' },
      { name: 'General Motors', symbol: 'GM' },
      { name: 'Ford Motor', symbol: 'F' },
    ],
    []
  );

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

  // Fetch stock and currency data for chart
  useEffect(() => {
    const getStockData = async () => {
      const data = await tradingViewLogic.fetchStockData(
        seletedStockTicker,
        selectedTimespan,
        startDate,
        endDate
      );
      setStockData(data);
    };

    const getCurrencyData = async () => {
      const data = await tradingViewLogic.fetchCurrencyData(
        seletedCurrencyTicker,
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
    seletedStockTicker,
    selectedTimespan,
    seletedCurrencyTicker,
  ]);

  // Get all stock data
  useEffect(() => {
    const getAllStockData = async () => {
      const results = await stocksTableLogic.fetchAllStockData(
        stocksList,
        selectedTimespan
      );
      setAllStockData(results);
    };

    getAllStockData();
  }, [selectedTimespan, stocksList, currentDateFormat]);

  // Merge chart data
  useEffect(() => {
    const mergedData = tradingViewLogic.mergeStockAndCurrencyData(
      stockData,
      currencyData,
      selectedTimespan
    );
    setChartData([...mergedData]);
  }, [stockData, currencyData, selectedTimespan]);

  // Sort table data
  useEffect(() => {
    const sortedData = stocksTableLogic.sortStockDataByDateAndRank(
      allStockData,
      currencyData
    );
    setSortedTableData(sortedData);
  }, [allStockData, currencyData]);

  // Fetch historical comparison data
  useEffect(() => {
    const fetchHistoricalData = async () => {
      const yearCurrencyData = await stocksTableLogic.fetchYearCurrencyData();
      setOneYearCurrencyData(yearCurrencyData);
    };

    fetchHistoricalData();
  }, [dateRanges.oneWeekYearAgo, currentDateFormat]);

  // Get comparison data for different time periods
  useEffect(() => {
    const fetchComparisonData = async () => {
      if (oneYearCurrencyData.length === 0) return;

      const sevenDayData = await stocksTableLogic.fetchSpecialDateData(
        stocksList,
        7,
        oneYearCurrencyData
      );
      setSevenDayStockData(sevenDayData);

      const thirtyDayData = await stocksTableLogic.fetchSpecialDateData(
        stocksList,
        30,
        oneYearCurrencyData
      );
      setThirtyDayStockData(thirtyDayData);

      const ninetyDayData = await stocksTableLogic.fetchSpecialDateData(
        stocksList,
        90,
        oneYearCurrencyData
      );
      setNineDayStockData(ninetyDayData);

      const yearData = await stocksTableLogic.fetchSpecialDateData(
        stocksList,
        365,
        oneYearCurrencyData
      );
      setYearDayStockData(yearData);
    };

    fetchComparisonData();
  }, [stocksList, oneYearCurrencyData, selectedTimespan]);

  // Helper functions for getting ratio data
  const sevenDaySingleStockData = (symbol) => {
    return stocksTableLogic.calculateRatioData(sevenDayStockData, symbol);
  };

  const thirtyDaySingleStockData = (symbol) => {
    return stocksTableLogic.calculateRatioData(thirtyDayStockData, symbol);
  };

  const ninetyDaySingleStockData = (symbol) => {
    return stocksTableLogic.calculateRatioData(ninetyDayStockData, symbol);
  };

  const yearDaySingleStockData = (symbol) => {
    return stocksTableLogic.calculateRatioData(yearyDayStockData, symbol);
  };

  // Get stock name by symbol
  const getNameBySymbol = (symbol) => {
    const stock = stocksList.find((stock) => stock.symbol === symbol);
    return stock ? stock.name : undefined;
  };

  // Set date range based on period button
  const setDateRangeByPeriod = (period) => {
    const range = dateUtils.setDateRangeByPeriod(period);
    setStartDate(range.startDate);
    setEndDate(range.endDate);
  };

  return (
    <div className='container w-full p-4 mx-auto'>
      <select
        defaultValue={seletedCurrencyTicker}
        onChange={(e) => {
          setSeletedCurrencyTicker(e.target.value);
        }}
        className='hidden max-w-[130px] mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
        {currencyList.map((item, idx) => (
          <option
            key={idx}
            value={item.symbol}>
            {item.name}
          </option>
        ))}
      </select>
      <TradingviewChart
        chartData={chartData}
        selectedTimespan={selectedTimespan}
        title={title}
        TopTitle='Stocks : '
        stocksList={stocksList}
        seletedStockTicker={seletedStockTicker}
        setSeletedStockTicker={(e) => setSeletedStockTicker(e)}
        setStartDate={() => setStartDate(dateRanges.oneYearAgo)}
      />
      <div className='flex items-start lg:items-center lg:gap-16 gap-4 mt-10 mb-4 lg:flex-row flex-col '>
        <div className='flex items-start lg:items-center gap-4 lg:flex-row flex-col'>
          From:
          <Datepicker
            value={startDate}
            onSelectedDateChanged={(date) => {
              setStartDate(moment(date).format('YYYY-MM-DD'));
            }}
            className=' w-40'
          />
          To:
          <Datepicker
            value={endDate}
            onSelectedDateChanged={(date) => {
              setEndDate(moment(date).format('YYYY-MM-DD'));
            }}
            className=' w-40'
          />
        </div>
        <div className='flex gap-4 items-center'>
          <select
            defaultValue={selectedTimespan}
            onChange={(e) => {
              setSelectedTimespan(e.target.value);
            }}
            disabled
            className='hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
            <option value='minute'>Minute</option>
            <option value='hour'>Hour</option>
            <option value='day'>Day</option>
            <option value='week'>Week</option>
            <option value='month'>Month</option>
            <option value='quarter'>Quarter</option>
            <option value='year'>Year</option>
          </select>
        </div>
        <div className='flex items-center justify-center'>
          <div
            className='inline-flex rounded-md shadow-light-3 transition duration-150 ease-in-out hover:bg-neutral-200 hover:shadow-light-2 focus:bg-neutral-200 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong'
            role='group'>
            <button
              type='button'
              className='inline-block rounded-s bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none'
              onClick={() => setDateRangeByPeriod('1D')}>
              1D
            </button>
            <button
              type='button'
              className='inline-block bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none'
              onClick={() => setDateRangeByPeriod('5D')}>
              5D
            </button>
            <button
              type='button'
              className='inline-block bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none'
              onClick={() => setDateRangeByPeriod('1M')}>
              1M
            </button>
            <button
              type='button'
              className='inline-block bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none'
              onClick={() => setDateRangeByPeriod('6M')}>
              6M
            </button>
            <button
              type='button'
              className='inline-block bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none'
              onClick={() => setDateRangeByPeriod('YTD')}>
              YTD
            </button>
            <button
              type='button'
              className='inline-block bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none'
              onClick={() => setDateRangeByPeriod('1Y')}>
              1Y
            </button>
            <button
              type='button'
              className='inline-block bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none'
              onClick={() => setDateRangeByPeriod('5Y')}>
              5Y
            </button>
            <button
              type='button'
              className='inline-block rounded-e bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none'
              onClick={() => setDateRangeByPeriod('MAX')}>
              Max
            </button>
          </div>
        </div>
      </div>

      <div className='list-scrollbar my-8 relative sm:rounded-lg border rounded-lg border-[#322e2d] border-opacity-80'>
        <table className='w-full text-sm text-center rtl:text-right text-white text-opacity-70 bg-transparent'>
          <thead className='text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 bg-transparent'>
            <tr className='border-[#4a4c70] border-b'>
              <th
                scope='col'
                className='pl-4 py-4'>
                Rank
              </th>
              <th
                scope='col'
                className='px-0 py-4'>
                Instrument
              </th>
              <th
                scope='col'
                className='px-0 py-4'>
                Last Price
              </th>
              <th
                scope='col'
                className='px-0 py-4'>
                24h %
              </th>
              <th
                scope='col'
                className='px-0 py-4'>
                7Day %
              </th>
              <th
                scope='col'
                className='px-0 py-4'>
                30Day %
              </th>
              <th
                scope='col'
                className='px-0 py-4'>
                90Day %
              </th>
              <th
                scope='col'
                className='pr-4 py-4'>
                1Year %
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTableData &&
              sortedTableData.map((item, idx) => (
                <tr
                  key={idx}
                  className='border-[#4a4c70] bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 !bg-transparent'>
                  <td className='pl-4 py-4'>{item.rank}</td>
                  <td className='px-0 py-4'>
                    {getNameBySymbol(item.symbol)} / BTC
                  </td>
                  <td className='px-0 py-4'>
                    {(item.c / (item.o / item.ratio)).toFixed(5)}
                  </td>
                  <td
                    className={`px-0 py-4 ${
                      item.c / item.o > 1 ? 'text-green-500' : 'text-red-500'
                    }`}>
                    {((item.c / item.o - 1) * 100).toFixed(2)}%
                  </td>
                  <td
                    className={`px-0 py-4 ${
                      item.c /
                        (item.o / item.ratio) /
                        sevenDaySingleStockData(item.symbol) >
                      1
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}>
                    {(
                      (item.c /
                        (item.o / item.ratio) /
                        sevenDaySingleStockData(item.symbol) -
                        1) *
                      100
                    ).toFixed(2)}
                    %
                  </td>
                  <td
                    className={`px-0 py-4 ${
                      item.c /
                        (item.o / item.ratio) /
                        thirtyDaySingleStockData(item.symbol) >
                      1
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}>
                    {(
                      (item.c /
                        (item.o / item.ratio) /
                        thirtyDaySingleStockData(item.symbol) -
                        1) *
                      100
                    ).toFixed(2)}
                    %
                  </td>
                  <td
                    className={`px-0 py-4 ${
                      item.c /
                        (item.o / item.ratio) /
                        ninetyDaySingleStockData(item.symbol) >
                      1
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}>
                    {(
                      (item.c /
                        (item.o / item.ratio) /
                        ninetyDaySingleStockData(item.symbol) -
                        1) *
                      100
                    ).toFixed(2)}
                    %
                  </td>
                  <td
                    className={`pr-4 py-4 ${
                      item.c /
                        (item.o / item.ratio) /
                        yearDaySingleStockData(item.symbol) >
                      1
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}>
                    {(
                      (item.c /
                        (item.o / item.ratio) /
                        yearDaySingleStockData(item.symbol) -
                        1) *
                      100
                    ).toFixed(2)}
                    %
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardSection;
