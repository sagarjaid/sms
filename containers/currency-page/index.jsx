/** @format */

'use client';
import { Datepicker } from 'flowbite-react';
import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useMemo } from 'react';

import TradingviewChart from '../../components/TradingviewChart.js';
import { convertTimestamp } from '../../utlities/convertDate';

const CollectionSection = () => {
  const API_URL = 'https://api.polygon.io/v2/aggs/ticker/X:';
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const [seletedCurrencyTicker, setSeletedCurrencyTicker] = useState('BTCUSD');
  const [title, setTitle] = useState('USD / BTC');
  const [selectedTimespan, setSelectedTimespan] = useState('day');
  const currentDate = new Date();
  const currentDateFormat = moment(currentDate).format('YYYY-MM-DD');
  const oneMonthAgo = new Date(
    currentDate.setMonth(currentDate.getMonth() - 1)
  );
  const oneDayAgo = moment().subtract(1, 'days').format('YYYY-MM-DD');
  const fiveDaysAgo = moment().subtract(5, 'days').format('YYYY-MM-DD');
  const oneMonthsAgo = moment().subtract(1, 'months').format('YYYY-MM-DD');
  const sixMonthsAgo = moment().subtract(6, 'months').format('YYYY-MM-DD');
  const startOfYear = moment().startOf('year').format('YYYY-MM-DD');
  const oneYearAgo = moment().subtract(1, 'years').format('YYYY-MM-DD');
  const fiveYearsAgo = moment().subtract(5, 'years').format('YYYY-MM-DD');
  const tenYearsAgo = moment().subtract(10, 'years').format('YYYY-MM-DD');
  const [startDate, setStartDate] = useState(
    moment(oneYearAgo).format('YYYY-MM-DD')
  );
  const [endDate, setEndDate] = useState(
    moment(new Date()).format('YYYY-MM-DD')
  );
  const [currencyData, setCurrencyData] = useState([]);
  const [BTCData, setBTCData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [allStockData, setAllStockData] = useState([]);
  const [sortedTableData, setSortedTableData] = useState([]);
  const [sevenDayStockData, setSevenDayStockData] = useState([]);
  const [thirtyDayStockData, setThirtyDayStockData] = useState([]);
  const [ninetyDayStockData, setNineDayStockData] = useState([]);
  const [yearyDayStockData, setYearDayStockData] = useState([]);

  const getNameBySymbol = (symbol) => {
    const stock = currencyList.find((stock) => stock.symbol === symbol);
    return stock ? stock.name : undefined;
  };

  const currencyList = useMemo(
    () => [
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
    ],
    []
  );

  useEffect(() => {
    const getCurrencyData = async () => {
      try {
        const response = await axios.get(
          API_URL +
            seletedCurrencyTicker +
            '/range/1/' +
            selectedTimespan +
            '/' +
            startDate +
            '/' +
            endDate +
            '?apiKey=' +
            API_KEY
        ); // Use GET request
        setCurrencyData([...response.data.results]);
        const tempData = response.data.results;
        setTableData(
          tempData.sort((a, b) => {
            const aValue = a.o > 1 ? 1 / a.o : a.o;
            const bValue = b.o > 1 ? 1 / b.o : b.o;
            return bValue - aValue;
          })
        );
      } catch (error) {
        console.error('Failed to fetch stock data:', error);
      }
    };
    getCurrencyData();
  }, [startDate, endDate, seletedCurrencyTicker, selectedTimespan]);

  useEffect(() => {
    const getBTCData = async () => {
      try {
        const response = await axios.get(
          API_URL +
            'BTCUSD/range/1/' +
            selectedTimespan +
            '/' +
            startDate +
            '/' +
            endDate +
            '?apiKey=' +
            API_KEY
        ); // Use GET request
        setBTCData([...response.data.results]);
      } catch (error) {
        console.error('Failed to fetch stock data:', error);
      }
    };
    getBTCData();
  }, [startDate, endDate, seletedCurrencyTicker, selectedTimespan]);

  useEffect(() => {
    const getAllStockData = async (daysAgo = 0) => {
      const formattedDate = moment()
        .subtract(daysAgo, 'days')
        .format('YYYY-MM-DD');
      try {
        const fetchPromises = currencyList.map((stock) => {
          const url = `${API_URL}${stock.symbol}/range/1/${selectedTimespan}/${formattedDate}/${formattedDate}?apiKey=${API_KEY}`;
          return axios.get(url).then((response) => ({
            symbol: stock.symbol,
            data: response.data.results,
          }));
        });

        const results = await Promise.all(fetchPromises);
        const hasData = results.some((result) => result?.data?.length > 0);

        if (!hasData) {
          console.log(
            `No results found for ${formattedDate}, retrying for previous day...`
          );
          return getAllStockData(daysAgo + 1);
        }

        setAllStockData(results);
        console.log(results);
      } catch (error) {
        return getAllStockData(daysAgo + 1);
        console.error('Failed to fetch stock data:', error);
      }
    };

    getAllStockData();
  }, [selectedTimespan, currencyList, currentDateFormat, oneDayAgo]);

  useEffect(() => {
    function convertTimestampToDate(timestamp) {
      const date = new Date(timestamp);
      return date.toISOString().split('T')[0]; // returns date in YYYY-MM-DD format
    }

    function findCurrencyDataByDate(currencyData, date) {
      return currencyData.find(
        (entry) => convertTimestampToDate(entry.t) === date
      );
    }

    function sortStockDataByDateAndRank(allstockdata, currencyData) {
      // Flatten the stock data
      const flatStockData = allstockdata
        .map((stock) =>
          stock?.data?.map((dataPoint) => ({
            symbol: stock.symbol,
            ...dataPoint,
            date: convertTimestampToDate(dataPoint.t),
          }))
        )
        .flat();

      // Map stock data with the ratio
      const mappedData = flatStockData
        .map((stockData) => {
          const currency = findCurrencyDataByDate(BTCData, stockData?.date);
          if (currency) {
            return {
              ...stockData,
              ratio: stockData.o > 1 ? 1 / stockData.o : stockData.o,
            };
          }
          return null; // Discard if no corresponding currency data is found
        })
        .filter((stockData) => stockData !== null); // Remove nulls

      // Group by date
      const groupedByDate = mappedData.reduce((acc, cur) => {
        (acc[cur.date] = acc[cur.date] || []).push(cur);
        return acc;
      }, {});

      // Sort each group by ratio and assign rank
      Object.keys(groupedByDate).forEach((date) => {
        groupedByDate[date].sort((a, b) => b.ratio - a.ratio); // sort descending for rank
        groupedByDate[date].forEach((item, index) => {
          item.rank = index + 1; // assign rank starting from 1
        });
      });

      // Flatten the grouped data back into a single array, sorted by date
      const rankedData = Object.values(groupedByDate).flat();
      rankedData.sort((a, b) => a.date.localeCompare(b.date)); // Sort by date
      console.log(rankedData, '9999999');
      return rankedData;
    }

    const sortedData =
      allStockData.length > 0
        ? sortStockDataByDateAndRank(allStockData, currencyData)
        : [];
    setSortedTableData(sortedData);
  }, [allStockData, currencyData, selectedTimespan, BTCData]);

  useEffect(() => {
    const getSpecialDateData = async (daysAgo = 0) => {
      const formattedDate = moment()
        .subtract(daysAgo, 'days')
        .format('YYYY-MM-DD');
      try {
        const fetchPromises = currencyList.map((stock) => {
          const url = `${API_URL}${stock.symbol}/range/1/day/${formattedDate}/${formattedDate}?apiKey=${API_KEY}`;
          return axios.get(url).then((response) => ({
            symbol: stock.symbol,
            data: response.data.results,
          }));
        });

        const results = await Promise.all(fetchPromises);
        const hasData = results.some((result) => result?.data?.length > 0);

        if (!hasData) {
          console.log(
            `No results found for ${formattedDate}, retrying for previous day...`
          );
          return getSpecialDateData(daysAgo + 1);
        }
        if (daysAgo >= 365) {
          setYearDayStockData(results);
        } else if (daysAgo >= 90) {
          setNineDayStockData(results);
        } else if (daysAgo >= 30) {
          setThirtyDayStockData(results);
        } else {
          setSevenDayStockData(results);
        }
      } catch (error) {
        return getSpecialDateData(daysAgo + 1);
        console.error('Failed to fetch stock data:', error);
      }
    };
    getSpecialDateData(7);
    getSpecialDateData(30);
    getSpecialDateData(90);
    getSpecialDateData(365);
  }, [currencyList]);

  const sevenDaySingleStockData = (_symbol) => {
    return sevenDayStockData.find((a) => a.symbol == _symbol)?.data[0].o;
  };
  const ninetyDaySingleStockData = (_symbol) => {
    return ninetyDayStockData.find((a) => a.symbol == _symbol)?.data[0].o;
  };
  const thirtyDaySingleStockData = (_symbol) => {
    return thirtyDayStockData.find((a) => a.symbol == _symbol)?.data[0].o;
  };
  const yearDaySingleStockData = (_symbol) => {
    return yearyDayStockData.find((a) => a.symbol == _symbol)?.data[0].o;
  };

  return (
    <div className='container mx-auto'>
      <TradingviewChart
        chartData={currencyData}
        selectedTimespan={selectedTimespan}
        page='currency'
        title={title}
        TopTitle='Currencies : '
        stocksList={currencyList}
        seletedStockTicker={setSeletedCurrencyTicker}
        setSeletedStockTicker={(e) => setSeletedCurrencyTicker(e)}
        setStartDate={() => setStartDate(oneYearAgo)}
      />
      <div className='flex items-start lg:items-center lg:gap-16 gap-4 mt-10 lg:flex-row flex-col '>
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
              data-twe-ripple-init
              data-twe-ripple-color='light'
              onClick={() => {
                setStartDate(oneDayAgo);
                setEndDate(currentDateFormat);
              }}>
              1D
            </button>
            <button
              type='button'
              className='inline-block bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none'
              data-twe-ripple-init
              data-twe-ripple-color='light'
              onClick={() => {
                setStartDate(fiveDaysAgo);
                setEndDate(currentDateFormat);
              }}>
              5D
            </button>
            <button
              type='button'
              className='inline-block bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none'
              data-twe-ripple-init
              data-twe-ripple-color='light'
              onClick={() => {
                setStartDate(oneMonthsAgo);
                setEndDate(currentDateFormat);
              }}>
              1M
            </button>
            <button
              type='button'
              className='inline-block bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none'
              data-twe-ripple-init
              data-twe-ripple-color='light'
              onClick={() => {
                setStartDate(sixMonthsAgo);
                setEndDate(currentDateFormat);
              }}>
              6M
            </button>
            <button
              type='button'
              className='inline-block bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none'
              data-twe-ripple-init
              data-twe-ripple-color='light'
              onClick={() => {
                setStartDate(startOfYear);
                setEndDate(currentDateFormat);
              }}>
              YTD
            </button>
            <button
              type='button'
              className='inline-block bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none'
              data-twe-ripple-init
              data-twe-ripple-color='light'
              onClick={() => {
                setStartDate(oneYearAgo);
                setEndDate(currentDateFormat);
              }}>
              1Y
            </button>
            <button
              type='button'
              className='inline-block bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none'
              data-twe-ripple-init
              data-twe-ripple-color='light'
              onClick={() => {
                setStartDate(fiveYearsAgo);
                setEndDate(currentDateFormat);
              }}>
              5Y
            </button>

            <button
              type='button'
              className='inline-block rounded-e bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none'
              data-twe-ripple-init
              data-twe-ripple-color='light'
              onClick={() => {
                setStartDate(tenYearsAgo);
                setEndDate(currentDateFormat);
              }}>
              Max
            </button>
          </div>
        </div>
      </div>

      <div className='list-scrollbar my-8 relative  sm:rounded-lg border rounded-lg border-[#322e2d] border-opacity-80'>
        <table className='w-full text-sm text-center rtl:text-right text-white text-opacity-70 bg-transparent'>
          <thead className='text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 bg-transparent'>
            <tr className='border-[#4a4c70] border-b'>
              <th
                scope='col'
                className='pl-4 py-4 '>
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
                  <td className='px-0 py-4'>{getNameBySymbol(item.symbol)}</td>
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
                      item.c / sevenDaySingleStockData(item.symbol) > 1
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}>
                    {(
                      (item.c / sevenDaySingleStockData(item.symbol) - 1) *
                      100
                    ).toFixed(2)}
                    %
                  </td>
                  <td
                    className={`px-0 py-4 ${
                      item.c / thirtyDaySingleStockData(item.symbol) > 1
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}>
                    {(
                      (item.c / thirtyDaySingleStockData(item.symbol) - 1) *
                      100
                    ).toFixed(2)}
                    %
                  </td>
                  <td
                    className={`px-0 py-4 ${
                      item.c / ninetyDaySingleStockData(item.symbol) > 1
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}>
                    {(
                      (item.c / ninetyDaySingleStockData(item.symbol) - 1) *
                      100
                    ).toFixed(2)}
                    %
                  </td>
                  <td
                    className={`pr-4 py-4 ${
                      item.c / yearDaySingleStockData(item.symbol) > 1
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}>
                    {(
                      (item.c / yearDaySingleStockData(item.symbol) - 1) *
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

export default CollectionSection;
