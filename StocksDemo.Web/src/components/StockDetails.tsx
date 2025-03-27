import React from 'react';
import { Stock, StocksDemoApiClient } from '../clients/StocksDemoApiClient';
import { IChartProps, LineChart } from '@fluentui/react-charting';
import { FontSizes, Stack } from '@fluentui/react';
import { getConfig } from '../utils/Config';

interface StockDetailsProps {
    symbol: string;
}

export const StockDetailsComponent: React.FC<StockDetailsProps> = ({ symbol }) => {
    const [stock, setStock] = React.useState<Stock | null>(null);
    const config = getConfig();

    React.useEffect(() => {
        setStock(null);
        const fetchStock = async (): Promise<Stock> => {
            const client = new StocksDemoApiClient(config.STOCKSDEMOAPI_URL);
            const result = await client.getStock(symbol);
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
                    yMinValue={stock?.history?.reduce((min, p) => p.price.vwap < min ? p.price.vwap : min, Number.MAX_VALUE) ?? 0}
                    yMaxValue={stock?.history?.reduce((max, p) => p.price.vwap > max ? p.price.vwap : max, Number.MIN_VALUE) ?? 0}
                    yAxisTitle='Price ($)'
                    data={points}
                />
            </Stack.Item>
        </Stack>
    );
};