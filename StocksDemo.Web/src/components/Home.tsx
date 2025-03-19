import React from "react";
import { StocksDemoApiClient, Stock } from "../clients/StocksDemoApiClient";
import { StocksComponent } from "./Stocks";

declare let stocksDemoConfig: any;

export const Home: React.FC = () => {
  return (
    <main>
      <div id="app">
        <StocksComponent />
      </div>
    </main>
  );
}
