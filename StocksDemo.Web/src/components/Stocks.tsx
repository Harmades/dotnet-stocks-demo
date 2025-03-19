import React from "react";
import { Stock, StocksDemoApiClient } from "../clients/StocksDemoApiClient";
import { FontSizes, getTheme, List, Separator, Stack } from "@fluentui/react";

declare let stocksDemoConfig: any;

export const StocksComponent: React.FC = () => {
    const [stocks, setStocks] = React.useState<Stock[]>([]);

    const theme = getTheme();

    React.useEffect(() => {
        const fetchStock = async () => {
            const client = new StocksDemoApiClient(stocksDemoConfig.STOCKSDEMOAPI_URL);
            // const result = await client.getStock('MSFT');
            // const result2 = await client.getStock('AAPL');
            const result = { symbol: 'MSFT', price: 123 };
            return Array(50).fill(result);
        };

        fetchStock().then((result) => setStocks(result));
    }, []);

    const stackItemStyles = {
        root: {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          },

    }
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
                                <div style={{ fontSize: FontSizes.size32 }}>
                                    {item.price}$
                                </div>
                            </Stack.Item>
                            <Stack.Item>
                                <div style={{ fontSize: FontSizes.size32, color: theme.palette.green }}>
                                    (+3.59%)
                                </div>
                            </Stack.Item>
                        </Stack>
                    </Stack.Item>
                </Stack>
        );
    };

    return (
        <List
            items = {stocks}
            onRenderCell = {onRenderCell}
            onShouldVirtualize = {() => false}
        />
    );
}