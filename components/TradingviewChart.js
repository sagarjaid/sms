/** @format */

'use client';
import { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import moment from 'moment';
// import { DatePicker } from '@/components/ui/date-picker';
import { format } from 'date-fns';
import { DatePicker } from './ui/date-range-picker';

const ChartComponent = ({
  chartData,
  selectedTimespan,
  page = 'stock',
  title = 'Value',
  TopTitle = '',
  stocksList = [],
  seletedStockTicker = '',
  setSeletedStockTicker,
  setStartDate,
  startDate,
  endDate,
  setEndDate,
  setDateRangeByPeriod,
}) => {
  const chartContainerRef = useRef();
  const [isLogScale, setIsLogScale] = useState(false);
  const [downloadChartData, setDownloadChartData] = useState([]);
  const [retitle, setReTitle] = useState(title);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Clean up previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.remove();
    }

    // Detect dark mode
    const isDarkMode = document.documentElement.classList.contains('dark');

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 550,
      layout: {
        background: { type: 'solid', color: 'transparent' },
        textColor: isDarkMode ? '#4B5563' : '#4B5563',
      },
      grid: {
        vertLines: {
          color: isDarkMode ? '#374151' : '#374151',
          style: 1,
          visible: true,
        },
        horzLines: {
          color: isDarkMode ? '#374151' : '#374151',
          style: 1,
          visible: true,
        },
      },
      rightPriceScale: {
        borderColor: isDarkMode ? '#4B5563' : '#4B5563',
        borderVisible: true,
      },
      timeScale: {
        borderColor: isDarkMode ? '#4B5563' : '#4B5563',
        borderVisible: true,
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time) => {
          return selectedTimespan == 'day'
            ? moment.utc(time).format('YYYY-MM-DD')
            : moment.utc(time).format('YYYY-MM-DD hh:mm');
        },
      },
    });

    // Store the chart instance in the ref
    chartRef.current = chart;

    // Create the series
    const series = chart.addLineSeries({
      color: '#10B981',
      lineWidth: 2,
      priceFormat: {
        type: 'custom',
        precision: 2,
        minMove: page == 'stock' ? 0.00001 : 0.00001,
        formatter: (price) => price.toFixed(5),
      },
    });

    // Store the series in the ref
    seriesRef.current = series;

    // Convert and set the data
    let convertedChartData = [];
    if (page == 'stock') {
      convertedChartData = chartData.map((item) => ({
        time:
          selectedTimespan == 'day'
            ? moment(item?.stock?.t).format('YYYY-MM-DD')
            : Math.floor(item?.stock?.t / 1000),
        value: item?.stock?.o / item?.currency?.o,
      }));
    } else if (page == 'currency') {
      convertedChartData = chartData.map((item) => ({
        time:
          selectedTimespan == 'day'
            ? moment(item?.t).format('YYYY-MM-DD')
            : Math.floor(item?.t / 1000),
        value: item?.o > 1 ? 1 / item?.o : item?.o,
      }));
    } else if (page == 'commodity') {
      convertedChartData = chartData.map((item) => ({
        time:
          selectedTimespan == 'day'
            ? moment(item?.stock?.t).format('YYYY-MM-DD')
            : Math.floor(item?.stock?.t / 1000),
        value: item?.stock?.o / item?.currency?.o,
      }));
    }

    // Set the data
    series.setData(convertedChartData);
    setDownloadChartData(convertedChartData);

    // Fit the content
    chart.timeScale().fitContent();

    // Handle log scale
    if (isLogScale) {
      chart.priceScale('right').applyOptions({
        mode: 1, // Logarithmic mode
      });
    } else {
      chart.priceScale('right').applyOptions({
        mode: 0, // Linear mode
      });
    }

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
      seriesRef.current = null;
    };
  }, [chartData, selectedTimespan, page, isLogScale]);

  const downloadData = () => {
    // Column headers based on the object keys
    const headersTitle = ['Date', 'Value'];
    const csvRows = [headersTitle.join(',')]; // Add the headers as the first row

    downloadChartData.forEach((item) => {
      let row = [];
      row.push(item.time);
      row.push(item.value);
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');

    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = retitle + '_chartData.csv';

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-4 mb-5 justify-between lg:flex-row flex-col items-center'>
        <div className=' font-bold text-lg sm:text-xl'>
          {TopTitle + retitle}
        </div>

        <div className='flex gap-4 items-start sm:items-center sm:flex-row flex-col flex-1 justify-end'>
          <div className='flex items-center gap-2'>
            <span>From:</span>
            <DatePicker
              date={startDate ? new Date(startDate) : undefined}
              onDateChange={(date) => {
                setStartDate(date ? format(date, 'yyyy-MM-dd') : '');
              }}
              className='w-40'
            />
            <span>To:</span>
            <DatePicker
              date={endDate ? new Date(endDate) : undefined}
              onDateChange={(date) => {
                setEndDate(date ? format(date, 'yyyy-MM-dd') : '');
              }}
              className='w-40'
            />
          </div>
          <div className='flex gap-4 items-center'>
            <label className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={isLogScale}
                onChange={(e) => setIsLogScale(e.target.checked)}
              />
              Logarithmic
            </label>
            <button
              className='bg-muted hover:bg-muted/80 text-muted-foreground font-bold py-1 px-2 rounded inline-flex items-center h-10 transition-colors'
              onClick={downloadData}>
              <svg
                className='fill-current w-4 h-4 mr-2'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'>
                <path d='M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z' />
              </svg>
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={chartContainerRef}
        style={{ width: '100%', height: '550px' }}
      />
      <div className='flex mt-2 items-center justify-center'>
        <div
          className='flex gap-6 w-full rounded-md transition duration-150 ease-in-out'
          role='group'>
          <button
            type='button'
            className='inline-block rounded-s bg-muted px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-muted-foreground transition duration-150 ease-in-out hover:bg-muted/80 focus:bg-muted/80 focus:outline-none focus:ring-0 active:bg-muted/80 rounded-md'
            onClick={() => setDateRangeByPeriod('1D')}>
            1D
          </button>
          <button
            type='button'
            className='inline-block bg-muted px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-muted-foreground transition duration-150 ease-in-out hover:bg-muted/80 focus:bg-muted/80 focus:outline-none focus:ring-0 active:bg-muted/80 rounded-md'
            onClick={() => setDateRangeByPeriod('5D')}>
            5D
          </button>
          <button
            type='button'
            className='inline-block bg-muted px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-muted-foreground transition duration-150 ease-in-out hover:bg-muted/80 focus:bg-muted/80 focus:outline-none focus:ring-0 active:bg-muted/80 rounded-md'
            onClick={() => setDateRangeByPeriod('1M')}>
            1M
          </button>
          <button
            type='button'
            className='inline-block bg-muted px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-muted-foreground transition duration-150 ease-in-out hover:bg-muted/80 focus:bg-muted/80 focus:outline-none focus:ring-0 active:bg-muted/80 rounded-md'
            onClick={() => setDateRangeByPeriod('6M')}>
            6M
          </button>
          <button
            type='button'
            className='inline-block bg-muted px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-muted-foreground transition duration-150 ease-in-out hover:bg-muted/80 focus:bg-muted/80 focus:outline-none focus:ring-0 active:bg-muted/80 rounded-md'
            onClick={() => setDateRangeByPeriod('YTD')}>
            YTD
          </button>
          <button
            type='button'
            className='inline-block bg-muted px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-muted-foreground transition duration-150 ease-in-out hover:bg-muted/80 focus:bg-muted/80 focus:outline-none focus:ring-0 active:bg-muted/80 rounded-md'
            onClick={() => setDateRangeByPeriod('1Y')}>
            1Y
          </button>
          <button
            type='button'
            className='inline-block bg-muted px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-muted-foreground transition duration-150 ease-in-out hover:bg-muted/80 focus:bg-muted/80 focus:outline-none focus:ring-0 active:bg-muted/80 rounded-md'
            onClick={() => setDateRangeByPeriod('5Y')}>
            5Y
          </button>
          <button
            type='button'
            className='inline-block bg-muted px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-muted-foreground transition duration-150 ease-in-out hover:bg-muted/80 focus:bg-muted/80 focus:outline-none focus:ring-0 active:bg-muted/80 rounded-md'
            onClick={() => setDateRangeByPeriod('MAX')}>
            MAX
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
