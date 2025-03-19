export interface Stock {
    symbol: string;
    price: number;
}

export class StocksDemoApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async getStock(symbol: string): Promise<Stock> {
        try {
            const response = await fetch(`${this.baseUrl}/stocks/${symbol}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch stock data for symbol ${symbol}: ${response.statusText}`);
            }
            const data: Stock = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch stock data for symbol ${symbol}: ${error}`);
        }
    }
}