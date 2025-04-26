export const convertTimestamp = (timestamp) => {
  let date = new Date(timestamp);
  return date.toUTCString();
};
