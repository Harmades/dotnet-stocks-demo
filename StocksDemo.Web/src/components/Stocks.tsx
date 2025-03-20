import React from "react";
import { Stock, StocksDemoApiClient } from "../clients/StocksDemoApiClient";
import { FontSizes, getTheme, List, SearchBox, Separator, Stack } from "@fluentui/react";

declare let stocksDemoConfig: any;

export const StocksComponent: React.FC = () => {
    const [stocks, setStocks] = React.useState<Stock[]>([]);
    const [searchText, setSearchText] = React.useState<string | null>(null);

    const theme = getTheme();

    React.useEffect(() => {
        const fetchStock = async (searchText: string | null): Promise<Stock[]> => {
            const client = new StocksDemoApiClient(stocksDemoConfig.STOCKSDEMOAPI_URL);
            const symbols = searchText?.split(',') ?? null;
            const result = await client.getStocks(symbols);
            // const result = { symbol: 'MSFT', price: 123 };
            return result;
        };

        fetchStock(searchText).then((result) => setStocks(result));
    }, [searchText]);

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

    const onRenderCell = (item: Stock | undefined, index: number | undefined) => {
        return (
            item &&
                <Stack
                    key={index}
                    style={{
                        float: 'left',
                        border: '1px solid #eee',
                        height: '200px',
                        width: '200px',
                        margin: '4px',
                        boxShadow: theme.effects.elevation4,
                        borderRadius: theme.effects.roundedCorner4}}
                    tokens={{ childrenGap: 10 }}>
                    <Stack.Item styles={stackItemStyles}>
                        <div style={{ fontSize: FontSizes.size20 }}>{item.symbol}</div>
                    </Stack.Item>
                    <Stack.Item>
                        <Separator />
                    </Stack.Item>
                    <Stack.Item styles={stackItemStyles}>
                        <Stack>
                            <Stack.Item>
                                <div style={{ fontSize: FontSizes.size32, textAlign: 'right' }}>
                                    {item.currentPrice.vwap.toFixed(2)}$
                                </div>
                            </Stack.Item>
                            <Stack.Item>
                                <div style={{ fontSize: FontSizes.size32, color: getColour(item), textAlign: 'right' }}>
                                    {item.changePercentage >= 0 ? '+' : ''}{item.changePercentage.toFixed(2)}%
                                </div>
                            </Stack.Item>
                        </Stack>
                    </Stack.Item>
                </Stack>
        );
    };

    return (
        <Stack styles={{ root: { marginTop: '4px' }}}>
            <Stack.Item>
                <SearchBox underlined onSearch={(newValue: string) => setSearchText(newValue)}></SearchBox>
            </Stack.Item>
            <Stack.Item>
                <List
                    items = {stocks}
                    onRenderCell = {onRenderCell}
                    onShouldVirtualize = {() => false}
                />
            </Stack.Item>
        </Stack>
    );
}