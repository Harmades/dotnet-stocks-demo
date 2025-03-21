import React from "react";
import { Stock, StocksDemoApiClient } from "../clients/StocksDemoApiClient";
import { DetailsList, FontSizes, getTheme, IColumn, List, SearchBox, SelectionMode, Separator, ShimmeredDetailsList, Stack } from "@fluentui/react";

declare let stocksDemoConfig: any;

export const StocksComponent: React.FC = () => {
    const [stocks, setStocks] = React.useState<Stock[] | null>(null);
    const [searchText, setSearchText] = React.useState<string | null>(null);

    const theme = getTheme();

    React.useEffect(() => {
        setStocks(null);
        const fetchStock = async (searchText: string | null): Promise<Stock[]> => {
            const client = new StocksDemoApiClient(stocksDemoConfig.STOCKSDEMOAPI_URL);
            const symbols = searchText?.split(',') ?? null;
            const result = await client.getStocks(symbols);
            // const result = { symbol: 'MSFT', price: 123 };
            return result;
        };

        fetchStock(searchText).then((result) => setStocks(result));
    }, [searchText]);

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
    ];

    const stackItemStyles = {
        root: {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          },
    };

    const getColour = (stock: Stock) => {
        return stock.changePercentage >= 0 ? theme.palette.green : theme.palette.red;
    };

    return (
        <Stack styles={{ root: { marginTop: '4px' }}}>
            <Stack.Item>
                <SearchBox underlined onSearch={(newValue: string) => setSearchText(newValue)} placeholder="MSFT,META,AMD"></SearchBox>
            </Stack.Item>
            <Stack.Item>
                <ShimmeredDetailsList
                    items={stocks || []}
                    onItemInvoked={(stock) => alert(`Item invoked: ${stock.symbol}`)}
                    selectionMode={SelectionMode.none}
                    columns={columns}
                    enableShimmer={!stocks} />
            </Stack.Item>
        </Stack>
    );
}