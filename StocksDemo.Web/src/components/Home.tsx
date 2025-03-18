import React from "react";
import { StocksDemoApiClient, Quote } from "../clients/StocksDemoApiClient";

declare let stocksDemoConfig: any;

const App:React.FC = () => {
  const [stock, setStock] = React.useState<Quote | null>(null);
  React.useEffect(() => {
    const fetchStock = async () => {
      const client = new StocksDemoApiClient(stocksDemoConfig.STOCKSDEMOAPI_URL);
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
