import { useEffect } from 'react';

export const usePolygonWebSocket = () => {
  useEffect(() => {
    // Ensure WebSocket connection is only attempted in the browser
    if (typeof window !== "undefined") {
      const { websocketClient } = require("@polygon.io/client-js");
      const stocksWS = websocketClient('1t0V8C_1q4wRIhtbqhOkghp1p5khrXCV', 'wss://delayed.polygon.io').stocks();

      const handleOpen = () => {
        console.log("WebSocket connection opened.");
        // Once the connection is open, authenticate and subscribe
        stocksWS.send(JSON.stringify({
          action: "auth",
          params: process.env.NEXT_PUBLIC_API_KEY,
        }));

        stocksWS.send(JSON.stringify({
          action: "subscribe",
          params: "AM.AAPL,A.AAPL",
        }));
      };

      // Listen for when the connection opens to authenticate and subscribe
      stocksWS.onopen = handleOpen;

      stocksWS.onmessage = ({data}) => {
        const messages = JSON.parse(data); // Adjusted to handle potential array of messages
        for (const message of messages) {
          // Process each message
          // console.log(message);
        }
      };

      // Cleanup on unmount
      return () => {
        console.log("Closing WebSocket connection.");
        stocksWS.close();
      };
    }
  }, []);
};
