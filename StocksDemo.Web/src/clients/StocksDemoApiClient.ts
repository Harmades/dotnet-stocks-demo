import { useNavigate } from "react-router-dom";

export interface StockPricePoint {
    low: number;
    high: number;
    open: number;
    close: number;
    vwap: number;
}

export interface StockHistory {
    date: Date;
    price: StockPricePoint;
    volume: number;
}

export interface Stock {
    symbol: string;
    currentPrice: StockPricePoint;
    history: StockHistory[];
    changePercentage: number;
}

export class StocksDemoApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async getStock(symbol: string): Promise<Stock> {
        try {
            const response = await fetch(`${this.baseUrl}/stocks/${symbol}`, {
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch stock data for symbol ${symbol}: ${response.statusText}`);
            }
            const data: Stock = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch stock data for symbol ${symbol}: ${error}`);
        }
    }

    public async getStocks(symbols: string[] | null): Promise<Stock[]> {
        try {
            let url = `${this.baseUrl}/stocks`;
            if (symbols !== null && symbols.length > 0) {
                url = url.concat(`?symbols=${symbols.join(',')}`);
            }
            const response = await fetch(url, {
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch stock data: ${response.statusText}`);
            }
            const data: Stock[] = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch stock data: ${error}`);
        }
    }
}