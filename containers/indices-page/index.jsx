"use client";
import { Datepicker } from "flowbite-react";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useMemo } from "react";
import { usePolygonWebSocket } from "../../utlities/socketService";
import { convertTimestamp } from "../../utlities/convertDate";
import TradingviewChart from "../../components/TradingviewChart.js";

const DashboardSection = () => {
  const API_URL = "https://api.polygon.io/v2/aggs/ticker/";
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const [seletedStockTicker, setSeletedStockTicker] = useState("SPY");
  const [seletedCurrencyTicker, setSeletedCurrencyTicker] = useState("BTCUSD");
  const [title, setTitle] = useState("S&P500 ETF / BTC");
  const [selectedTimespan, setSelectedTimespan] = useState("day");
  const currentDate = new Date();
  const currentDateFormat = moment(currentDate).format("YYYY-MM-DD");
  const oneDayAgo = moment().subtract(1, "days").format("YYYY-MM-DD");
  const fiveDaysAgo = moment().subtract(5, "days").format("YYYY-MM-DD");
  const oneMonthsAgo = moment().subtract(1, "months").format("YYYY-MM-DD");
  const sixMonthsAgo = moment().subtract(6, "months").format("YYYY-MM-DD");
  const startOfYear = moment().startOf("year").format("YYYY-MM-DD");
  const oneYearAgo = moment().subtract(1, "years").format("YYYY-MM-DD");
  const oneWeekYearAgo = moment()
    .subtract(1, "years")
    .subtract(1, "weeks")
    .format("YYYY-MM-DD");
  const [oneYearCurrencyData, setOneYearCurrencyData] = useState([]);
  const fiveYearsAgo = moment().subtract(5, "years").format("YYYY-MM-DD");
  const tenYearsAgo = moment().subtract(10, "years").format("YYYY-MM-DD");
  const [allStockData, setAllStockData] = useState([]);
  const [sevenDayStockData, setSevenDayStockData] = useState([]);
  const [thirtyDayStockData, setThirtyDayStockData] = useState([]);
  const [ninetyDayStockData, setNineDayStockData] = useState([]);
  const [yearyDayStockData, setYearDayStockData] = useState([]);
  const [sortedTableData, setSortedTableData] = useState([]);
  const getNameBySymbol = (symbol) => {
    const stock = stocksList.find((stock) => stock.symbol === symbol);
    return stock ? stock.name : undefined;
  };

  const oneMonthAgo = new Date(
    currentDate.setMonth(currentDate.getMonth() - 1)
  );
  const [startDate, setStartDate] = useState(
    moment(oneYearAgo).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [stockData, setStockData] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const stocksList = useMemo(
    () => [
      { name: "S&P500 ETF", symbol: "SPY" },
      { name: "Invesco NASDAQ ETF", symbol: "QQQ" },
      { name: "iShares Dow Jones ETF", symbol: "IYY" },
      { name: "iShares Bitcoin Trust", symbol: "IBIT" },
      { name: "Fidelity Wise Origin Bitcoin Trust", symbol: "FBTC" },
      { name: "Grayscale Bitcoin Trust", symbol: "GBTC" },
    ],
    []
  );
  const currencyList = [
    { symbol: "BTCUSD", name: "USD / BTC" },
    { symbol: "BTCAUD", name: "AUD / BTC" },
    { symbol: "BTCEUR", name: "EUR / BTC" },
    { symbol: "BTCGBP", name: "GBP / BTC" },
    { symbol: "BTCJPY", name: "JPY / BTC" },
    { symbol: "ETHBTC", name: "ETH / BTC" },
    { symbol: "BNBBTC", name: "BNB / BTC" },
    { symbol: "LTCBTC", name: "LTC / BTC" },
    { symbol: "BTCDOGE", name: "DOGE / BTC" },
    { symbol: "XRPBTC", name: "XRP / BTC" },
  ];

  useEffect(() => {
    const getStockData = async () => {
      try {
        const response = await axios.get(
          API_URL +
            seletedStockTicker +
            "/range/1/" +
            selectedTimespan +
            "/" +
            startDate +
            "/" +
            endDate +
            "?limit=50000&apiKey=" +
            API_KEY
        ); // Use GET request // Log the response data
        setStockData(response.data.results);
      } catch (error) {
        console.error("Failed to fetch stock data:", error);
      }
    };
    const getCurrencyData = async () => {
      try {
        const response = await axios.get(
          API_URL +
            "X:" +
            seletedCurrencyTicker +
            "/range/1/" +
            selectedTimespan +
            "/" +
            startDate +
            "/" +
            endDate +
            "?apiKey=" +
            API_KEY
        ); // Use GET request
        setCurrencyData(response.data.results);
      } catch (error) {
        console.error("Failed to fetch stock data:", error);
      }
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

  useEffect(() => {
    const getAllStockData = async (daysAgo = 0) => {
      const formattedDate = moment()
        .subtract(daysAgo, "days")
        .format("YYYY-MM-DD");
      try {
        const fetchPromises = stocksList.map((stock) => {
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
        console.error("Failed to fetch stock data:", error);
      }
    };

    getAllStockData();
  }, [oneDayAgo, selectedTimespan, stocksList, currentDateFormat]);

  useEffect(() => {
    function convertAndMergeData(stockData, currencyData) {
      const dateFormat =
        selectedTimespan == "hour" || selectedTimespan == "minute"
          ? {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }
          : { year: "numeric", month: "2-digit", day: "2-digit" };

      // Convert timestamp to date string (YYYY-MM-DD)
      const convertToDate = (t) =>
        new Date(t).toLocaleDateString("en-CA", dateFormat);

      // Preparing the data by adding a 'date' property
      stockData?.forEach((item) => (item.date = convertToDate(item.t)));
      currencyData?.forEach((item) => (item.date = convertToDate(item.t)));

      let mergedData = [];

      stockData?.forEach((stock) => {
        const currency = currencyData.find((c) => c.date === stock.date);
        mergedData.push({
          date: stock.date,
          stock: stock,
          currency: currency || null, // Fallback to null if no matching currency data
        });
      });

      return mergedData;
    }

    const mergedData = convertAndMergeData(stockData, currencyData);
    setChartData([...mergedData]);
    const tempData = mergedData;
    setTableData(
      tempData.sort((a, b) => {
        const ratioA = a?.stock?.vw / a?.currency?.vw;
        const ratioB = b?.stock?.vw / b?.currency?.vw;
        return ratioB - ratioA;
      })
    );

    // transformedData
  }, [stockData, currencyData, selectedTimespan]);

  useEffect(() => {
    function convertTimestampToDate(timestamp) {
      const date = new Date(timestamp);
      return date.toISOString().split("T")[0]; // returns date in YYYY-MM-DD format
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
          const currency = findCurrencyDataByDate(
            currencyData,
            stockData?.date
          );
          if (currency) {
            return { ...stockData, ratio: stockData.o / currency.o };
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
        groupedByDate[date].sort((a, b) => b.o - a.o); // sort descending for rank
        groupedByDate[date].forEach((item, index) => {
          item.rank = index + 1; // assign rank starting from 1
        });
      });

      // Flatten the grouped data back into a single array, sorted by date
      const rankedData = Object.values(groupedByDate).flat();
      rankedData.sort((a, b) => a.date.localeCompare(b.date)); // Sort by date

      return rankedData;
    }

    const sortedData = sortStockDataByDateAndRank(allStockData, currencyData);
    setSortedTableData(sortedData);
  }, [allStockData, currencyData, selectedTimespan]);

  // usePolygonWebSocket();
  useEffect(() => {
    function convertAndMergeData(stockData, currencyData) {
      const dateFormat =
        selectedTimespan == "hour" || selectedTimespan == "minute"
          ? {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }
          : { year: "numeric", month: "2-digit", day: "2-digit" };

      // Convert timestamp to date string (YYYY-MM-DD)
      const convertToDate = (t) =>
        new Date(t).toLocaleDateString("en-CA", dateFormat);

      // Preparing the data by adding a 'date' property
      stockData?.forEach((item) => {
        if (item?.data && item.data[0]) {
          item.date = convertToDate(item.data[0].t);
        } else {
          console.log("Data is missing for item:", item);
        }
      });
      currencyData?.forEach((item) => (item.date = convertToDate(item.t)));

      let mergedData = [];

      stockData?.forEach((stock) => {
        const currency = currencyData.find((c) => c.date === stock.date);
        mergedData.push({
          date: stock.date,
          stock: stock,
          currency: currency || null, // Fallback to null if no matching currency data
        });
      });

      return mergedData;
    }
    let cnt = 0;
    const getSpecialDateData = async (daysAgo = 0) => {
      const formattedDate = moment()
        .subtract(daysAgo, "days")
        .format("YYYY-MM-DD");
      try {
        const fetchPromises = stocksList.map((stock) => {
          const url = `${API_URL}${stock.symbol}/range/1/day/${formattedDate}/${formattedDate}?apiKey=${API_KEY}`;
          return axios.get(url).then((response) => ({
            symbol: stock.symbol,
            data: response.data.results,
          }));
        });

        const results = await Promise.all(fetchPromises);
        const hasData = results.some(
          (result) => result.symbol != "FBTC" && result?.data?.length > 0
        );
        console.log(results, hasData, formattedDate), "99999999999";

        if (!hasData) {
          console.log(
            `No results found for ${formattedDate}, ${cnt} retrying for previous day...`
          );
          return getSpecialDateData(daysAgo + 1);
        }
        const mergedData = convertAndMergeData(results, oneYearCurrencyData);
        if (daysAgo >= 365) {
          setYearDayStockData(mergedData);
        } else if (daysAgo >= 90) {
          setNineDayStockData(mergedData);
        } else if (daysAgo >= 30) {
          setThirtyDayStockData(mergedData);
        } else {
          setSevenDayStockData(mergedData);
        }
      } catch (error) {
        console.error("Failed to fetch stock data:", error);
        return getSpecialDateData(daysAgo + 1);
      }
    };
    getSpecialDateData(7);
    getSpecialDateData(30);
    getSpecialDateData(90);
    getSpecialDateData(365);
  }, [stocksList, oneYearCurrencyData, selectedTimespan]);

  useEffect(() => {
    const getCurrencyData = async () => {
      try {
        const response = await axios.get(
          API_URL +
            "X:BTCUSD" +
            "/range/1/day" +
            "/" +
            oneWeekYearAgo +
            "/" +
            currentDateFormat +
            "?apiKey=" +
            API_KEY
        ); // Use GET request
        setOneYearCurrencyData(response.data.results);
      } catch (error) {
        console.error("Failed to fetch stock data:", error);
      }
    };
    getCurrencyData();
  }, [oneWeekYearAgo, currentDateFormat]);

  const sevenDaySingleStockData = (_symbol) => {
    const ratio = sevenDayStockData.map((item) => {
      const stockSymbol = item.stock.symbol;
      const stockOpenPrice = item.stock.data[0].o;
      const currencyOpenPrice = item?.currency?.o;
      const ratio = stockOpenPrice / currencyOpenPrice;
      return { stockSymbol, ratio };
    });
    return ratio.find((a) => a.stockSymbol == _symbol)?.ratio;
  };
  const ninetyDaySingleStockData = (_symbol) => {
    const ratio = ninetyDayStockData.map((item) => {
      const stockSymbol = item.stock.symbol;
      const stockOpenPrice = item.stock.data[0].o;
      const currencyOpenPrice = item?.currency?.o;
      const ratio = stockOpenPrice / currencyOpenPrice;
      return { stockSymbol, ratio };
    });
    return ratio.find((a) => a.stockSymbol == _symbol)?.ratio;
  };
  const thirtyDaySingleStockData = (_symbol) => {
    const ratio = thirtyDayStockData.map((item) => {
      const stockSymbol = item.stock.symbol;
      const stockOpenPrice = item.stock.data[0].o;
      const currencyOpenPrice = item?.currency?.o;
      const ratio = stockOpenPrice / currencyOpenPrice;
      return { stockSymbol, ratio };
    });
    return ratio.find((a) => a.stockSymbol == _symbol)?.ratio;
  };
  const yearDaySingleStockData = (_symbol) => {
    const ratio = yearyDayStockData.map((item) => {
      const stockSymbol = item.stock.symbol;
      const stockOpenPrice = item.stock.data && item.stock.data.length > 0 ? item.stock.data[0].o : undefined;
      const currencyOpenPrice = item?.currency?.o;
      const ratio = stockOpenPrice / currencyOpenPrice;
      return { stockSymbol, ratio };
    });
    return ratio.find((a) => a.stockSymbol == _symbol)?.ratio;
  };

  return (
    <div className="container mx-auto">
      <select
        defaultValue={seletedCurrencyTicker}
        onChange={(e) => {
          setSeletedCurrencyTicker(e.target.value);
        }}
        className="hidden max-w-[130px] mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {currencyList.map((item, idx) => (
          <option key={idx} value={item.symbol}>
            {item.name}
          </option>
        ))}
      </select>
      <TradingviewChart
        chartData={chartData}
        selectedTimespan={selectedTimespan}
        title={title}
        TopTitle="Indices : "
        stocksList={stocksList}
        seletedStockTicker={seletedStockTicker}
        setSeletedStockTicker={(e) => setSeletedStockTicker(e)}
        setStartDate={() => setStartDate(oneYearAgo)}
      />
      <div className="flex items-start lg:items-center lg:gap-16 gap-4 mt-10 lg:flex-row flex-col ">
        <div className="flex items-start lg:items-center gap-4 lg:flex-row flex-col">
          From:
          <Datepicker
            value={startDate}
            onSelectedDateChanged={(date) => {
              setStartDate(moment(date).format("YYYY-MM-DD"));
            }}
            className=" w-40"
          />
          To:
          <Datepicker
            value={endDate}
            onSelectedDateChanged={(date) => {
              setEndDate(moment(date).format("YYYY-MM-DD"));
            }}
            className=" w-40"
          />
        </div>
        <div className="flex gap-4 items-center">
          <select
            defaultValue={selectedTimespan}
            onChange={(e) => {
              setSelectedTimespan(e.target.value);
            }}
            disabled
            className="hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="minute">Minute</option>
            <option value="hour">Hour</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="quarter">Quarter</option>
            <option value="year">Year</option>
          </select>
        </div>
        <div className="flex items-center justify-center">
          <div
            className="inline-flex rounded-md shadow-light-3 transition duration-150 ease-in-out hover:bg-neutral-200 hover:shadow-light-2 focus:bg-neutral-200 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            role="group"
          >
            <button
              type="button"
              className="inline-block rounded-s bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              onClick={() => {
                setStartDate(oneDayAgo);
                setEndDate(currentDateFormat);
              }}
            >
              1D
            </button>
            <button
              type="button"
              className="inline-block bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              onClick={() => {
                setStartDate(fiveDaysAgo);
                setEndDate(currentDateFormat);
              }}
            >
              5D
            </button>
            <button
              type="button"
              className="inline-block bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              onClick={() => {
                setStartDate(oneMonthsAgo);
                setEndDate(currentDateFormat);
              }}
            >
              1M
            </button>
            <button
              type="button"
              className="inline-block bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              onClick={() => {
                setStartDate(sixMonthsAgo);
                setEndDate(currentDateFormat);
              }}
            >
              6M
            </button>
            <button
              type="button"
              className="inline-block bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              onClick={() => {
                setStartDate(startOfYear);
                setEndDate(currentDateFormat);
              }}
            >
              YTD
            </button>
            <button
              type="button"
              className="inline-block bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              onClick={() => {
                setStartDate(oneYearAgo);
                setEndDate(currentDateFormat);
              }}
            >
              1Y
            </button>
            <button
              type="button"
              className="inline-block bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              onClick={() => {
                setStartDate(fiveYearsAgo);
                setEndDate(currentDateFormat);
              }}
            >
              5Y
            </button>

            <button
              type="button"
              className="inline-block rounded-e bg-neutral-100 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-0 active:bg-neutral-200 motion-reduce:transition-none"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              onClick={() => {
                setStartDate(tenYearsAgo);
                setEndDate(currentDateFormat);
              }}
            >
              Max
            </button>
          </div>
        </div>
      </div>

      <div className="list-scrollbar my-8 relative  sm:rounded-lg border rounded-lg border-[#322e2d] border-opacity-80">
        <table className="w-full text-sm text-center rtl:text-right text-white text-opacity-70 bg-transparent">
          <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 bg-transparent">
            <tr className="border-[#4a4c70] border-b">
              <th scope="col" className="pl-4 py-4 ">
                Rank
              </th>
              <th scope="col" className="px-0 py-4">
                Instrument
              </th>
              <th scope="col" className="px-0 py-4">
                Last Price
              </th>

              <th scope="col" className="px-0 py-4">
                24h %
              </th>
              <th scope="col" className="px-0 py-4">
                7Day %
              </th>
              <th scope="col" className="px-0 py-4">
                30Day %
              </th>
              <th scope="col" className="px-0 py-4">
                90Day %
              </th>
              <th scope="col" className="pr-4 py-4">
                1Year %
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTableData &&
              sortedTableData.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-[#4a4c70] bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 !bg-transparent"
                >
                  <td className="pl-4 py-4">{item.rank}</td>
                  <td className="px-0 py-4">
                    {getNameBySymbol(item.symbol)} / BTC
                  </td>
                  <td className="px-0 py-4">
                    {(item.c / (item.o / item.ratio)).toFixed(5)}
                  </td>
                  <td
                    className={`px-0 py-4 ${
                      item.c / item.o > 1 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {((item.c / item.o - 1) * 100).toFixed(2)}%
                  </td>
                  <td
                    className={`px-0 py-4 ${
                      item.c /
                        (item.o / item.ratio) /
                        sevenDaySingleStockData(item.symbol) >
                      1
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
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
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
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
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
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
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
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
