import React from "react";
import { StocksDemoApiClient, Quote } from "../clients/StocksDemoApiClient";

const App:React.FC = () => {
  const [stock, setStock] = React.useState<Quote | null>(null);
  React.useEffect(() => {
    const fetchStock = async () => {
      const client = new StocksDemoApiClient('https://localhost:7462');
      const result = await client.getStock('MSFT');
      return result;
    };

    fetchStock().then((result) => setStock(result));
  }, []);
  return (
    <main>
      <div id="app">
        <h1>Stocks Demo</h1>
        <p>Stock price for MSFT: {stock?.price}</p>
      </div>
    </main>
  );
}

export default App;
