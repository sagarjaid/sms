/** @format */

'use client';
import moment from 'moment';

export const useDateUtils = () => {
  // Get current date in various formats
  const getCurrentDate = () => {
    const currentDate = new Date();
    return {
      jsDate: currentDate,
      formatted: moment(currentDate).format('YYYY-MM-DD'),
    };
  };

  // Get standard date ranges used across the application
  const getDateRanges = () => {
    return {
      oneDayAgo: moment().subtract(1, 'days').format('YYYY-MM-DD'),
      fiveDaysAgo: moment().subtract(5, 'days').format('YYYY-MM-DD'),
      oneMonthAgo: moment().subtract(1, 'months').format('YYYY-MM-DD'),
      sixMonthsAgo: moment().subtract(6, 'months').format('YYYY-MM-DD'),
      startOfYear: moment().startOf('year').format('YYYY-MM-DD'),
      oneYearAgo: moment().subtract(1, 'years').format('YYYY-MM-DD'),
      oneWeekYearAgo: moment()
        .subtract(1, 'years')
        .subtract(1, 'weeks')
        .format('YYYY-MM-DD'),
      fiveYearsAgo: moment().subtract(5, 'years').format('YYYY-MM-DD'),
      tenYearsAgo: moment().subtract(10, 'years').format('YYYY-MM-DD'),
    };
  };

  // Convert timestamp to ISO date string (YYYY-MM-DD)
  const timestampToISODate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
  };

  // Format date according to timespan
  const formatDateByTimespan = (timestamp, timespan) => {
    const dateFormat =
      timespan === 'hour' || timespan === 'minute'
        ? {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }
        : {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          };

    return new Date(timestamp).toLocaleDateString('en-CA', dateFormat);
  };

  // Set date range based on preset periods
  const setDateRangeByPeriod = (period) => {
    const currentDate = moment(new Date()).format('YYYY-MM-DD');
    const ranges = getDateRanges();

    switch (period) {
      case '1D':
        return { startDate: ranges.oneDayAgo, endDate: currentDate };
      case '5D':
        return { startDate: ranges.fiveDaysAgo, endDate: currentDate };
      case '1M':
        return { startDate: ranges.oneMonthAgo, endDate: currentDate };
      case '6M':
        return { startDate: ranges.sixMonthsAgo, endDate: currentDate };
      case 'YTD':
        return { startDate: ranges.startOfYear, endDate: currentDate };
      case '1Y':
        return { startDate: ranges.oneYearAgo, endDate: currentDate };
      case '5Y':
        return { startDate: ranges.fiveYearsAgo, endDate: currentDate };
      case 'MAX':
        return { startDate: ranges.tenYearsAgo, endDate: currentDate };
      default:
        return { startDate: ranges.oneYearAgo, endDate: currentDate };
    }
  };

  return {
    getCurrentDate,
    getDateRanges,
    timestampToISODate,
    formatDateByTimespan,
    setDateRangeByPeriod,
  };
};

export default useDateUtils;
