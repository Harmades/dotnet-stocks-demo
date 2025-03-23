import React from "react";
import { Stock, StocksDemoApiClient } from "../clients/StocksDemoApiClient";
import { getTheme, IColumn, PrimaryButton, SelectionMode, ShimmeredDetailsList } from "@fluentui/react";

declare let stocksDemoConfig: any;

export interface StocksComponentProps {
    symbols: string[] | null;
    setSelectedSymbol: (symbol: string) => void;
}

export const StocksComponent: React.FC<StocksComponentProps> = ({ symbols, setSelectedSymbol }) => {
    const [stocks, setStocks] = React.useState<Stock[] | null>(null);

    const theme = getTheme();

    React.useEffect(() => {
        setStocks(null);
        const fetchStock = async (): Promise<Stock[]> => {
            const client = new StocksDemoApiClient(stocksDemoConfig.STOCKSDEMOAPI_URL);
            const result = await client.getStocks(symbols);
            return result;
        };

        fetchStock().then((result) => setStocks(result));
    }, [symbols]);

    const columns: IColumn[] = [
        {
            key: 'symbol',
            name: 'Symbol',
            minWidth: 100,
            isResizable: true,
            onRender: (stock: Stock) => {
                return (
                    <span>{stock.symbol}</span>
                )
            }
        },
        {
            key: 'open',
            name: 'Open',
            minWidth: 100,
            isResizable: true,
            onRender: (stock: Stock) => {
                return (
                    <span>{stock.currentPrice.open}$</span>
                )
            }
        },
        {
            key: 'high',
            name: 'High',
            minWidth: 100,
            isResizable: true,
            onRender: (stock: Stock) => {
                return (
                    <span>{stock.currentPrice.high}$</span>
                )
            }
        },
        {
            key: 'low',
            name: 'Low',
            minWidth: 100,
            isResizable: true,
            onRender: (stock: Stock) => {
                return (
                    <span>{stock.currentPrice.low}$</span>
                )
            }
        },
        {
            key: 'close',
            name: 'Close',
            minWidth: 100,
            isResizable: true,
            onRender: (stock: Stock) => {
                return (
                    <span>{stock.currentPrice.close}$</span>
                )
            }
        },
        {
            key: 'vwap',
            name: 'Vwap',
            minWidth: 100,
            isResizable: true,
            onRender: (stock: Stock) => {
                return (
                    <span>{stock.currentPrice.vwap.toFixed(2)}$</span>
                )
            }
        },
        {
            key: 'change',
            name: 'Change',
            minWidth: 100,
            isResizable: true,
            onRender: (stock: Stock) => {
                return (
                    <span style={{ color: getColour(stock) }}>
                        {stock.changePercentage >= 0 ? '+' : ''}
                        {stock.changePercentage.toFixed(2)}%
                    </span>
                )
            }
        },
        {
            key: 'action',
            name: 'Action',
            minWidth: 100,
            isResizable: true,
            onRender: (stock: Stock) => {
                return (
                    <PrimaryButton onClick={() => setSelectedSymbol(stock.symbol)}>
                        Show Details
                    </PrimaryButton>
                )
            }
        },
    ];

    const getColour = (stock: Stock) => {
        return stock.changePercentage >= 0 ? theme.palette.green : theme.palette.red;
    };

    return (
        <ShimmeredDetailsList
            items={stocks || []}
            onItemInvoked={(stock) => setSelectedSymbol(stock.symbol)}
            selectionMode={SelectionMode.none}
            columns={columns}
            enableShimmer={!stocks} />
    );
}