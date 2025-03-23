import React from 'react';
import { Stock, StocksDemoApiClient } from '../clients/StocksDemoApiClient';
import { IChartProps, LineChart } from '@fluentui/react-charting';
import { FontSizes, getTheme, Stack } from '@fluentui/react';

declare let stocksDemoConfig: any;

interface StockDetailsProps {
    symbol: string;
}

export const StockDetailsComponent: React.FC<StockDetailsProps> = ({ symbol }) => {
    const [stock, setStock] = React.useState<Stock | null>(null);
    const theme = getTheme();

    React.useEffect(() => {
        setStock(null);
        const fetchStock = async (): Promise<Stock> => {
            const client = new StocksDemoApiClient(stocksDemoConfig.STOCKSDEMOAPI_URL);
            const result = await client.getStock(symbol);
            // const result = { symbol: 'MSFT', price: 123 };
            return result;
        };

        fetchStock().then((result) => setStock(result));
    }, [symbol]);

    const points: IChartProps = {
        lineChartData: [
            {
                legend: 'Stock Price',
                data: stock?.history?.map((history) => (
                    {
                        x: new Date(history.date),
                        y: history.price.vwap,
                    })) ?? []
            }],
    };

    return (
        <Stack>
            <Stack.Item align='center'>
                <div style={{ fontSize: FontSizes.large }}>{symbol}</div>
            </Stack.Item>
            <Stack.Item>
                <LineChart
                    xAxisTitle='Date (UTC)'
                    yAxisTitle='Price ($)'
                    data={points}
                />
            </Stack.Item>
        </Stack>
    );
};