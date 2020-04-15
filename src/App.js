import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const payload = {
    stocks: ["IBM", "AAPL", "AMZN"],
    start: [141.78, 237.15, 1727.41],
    current: [131.67, 287.48, 1727.4111111]
  };

  const getStructuredData = payload => {
    return payload.stocks.map((name, index) => {
      return {
        stock: name,
        start: payload.start[index],
        change: payload.current[index] - payload.start[index]
      };
    });
  };

  const [show, setShow] = useState(false);

  const renderHeader = () => {
    return (
      <div className="container">
        <div className="flex cell">Stock</div>
        <div className="flex cell">Current</div>
        <div className="flex cell">Change</div>
      </div>
    );
  };

  const renderRow = data => {
    return data.map(({ stock, start, change }) => {
      const roundedChange = Math.round(change * 100) / 100;
      const isNegative = roundedChange < 0;
      const negative = isNegative ? { color: "red" } : undefined;
      return (
        <div className="column" key={stock}>
          <div className="flex cell">{stock}</div>
          <div className="flex cell">{start}</div>
          <div className="flex cell" style={negative}>
            {isNegative ? -roundedChange : roundedChange}
          </div>
        </div>
      );
    });
  };

  const toggleList = () => {
    setShow(!show);
  };

  const sortedData = getStructuredData(payload).sort((a, b) => {
    return a.stock.localeCompare(b.stock);
  });

  return (
    <div>
      <button onClick={toggleList}>
        <span>Show list</span>
      </button>
      {show && (
        <>
          {renderHeader()}
          {renderRow(sortedData)}
        </>
      )}
    </div>
  );
}
