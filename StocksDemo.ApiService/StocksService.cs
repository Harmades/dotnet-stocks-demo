using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Alpaca.Markets;

public class StocksService : IStocksService
{
    private readonly IAlpacaDataClient client;

    public StocksService(IAlpacaDataClient client)
    {
        this.client = client;
    }

    public async Task<Stock> GetStock(string symbol)
    {
        if (string.IsNullOrEmpty(symbol))
        {
            throw new ArgumentException("Symbol cannot be empty", nameof(symbol));
        }

        var bars = await client.ListHistoricalBarsAsync(
            new HistoricalBarsRequest(symbol, BarTimeFrame.Day, new Interval<DateTime>(DateTime.Today.AddDays(-7), null))
        );

        var currentBar = bars.Items[6];
        var stock = new Stock
        {
            Symbol = symbol,
            CurrentPrice = new StockPricePoint
            {
                Low = currentBar.Low,
                High = currentBar.High,
                Open = currentBar.Open,
                Close = currentBar.Close,
                Vwap = currentBar.Vwap
            },
            History = bars.Items.Select(b => new StockHistory
            {
                Price = new StockPricePoint
                {
                    Low = b.Low,
                    High = b.High,
                    Open = b.Open,
                    Close = b.Close,
                    Vwap = b.Vwap,
                },
                Volume = b.Volume,
                Date = b.TimeUtc
            }).ToList(),
            ChangePercentage = (currentBar.Vwap - bars.Items[5].Vwap) / bars.Items[5].Close * 100
        };

        return stock;
    }

    public async Task<List<Stock>> GetStocks(StocksRequestOptions options)
    {
        // If symbols are null, provide most active stocks.
        if (options.Symbols == null)
        {
            var mostActiveStocks = await client.ListMostActiveStocksByVolumeAsync(25);
            options = options with { Symbols = mostActiveStocks.Select(stock => stock.Symbol).ToList() };
        }

        // Get the last days: if market isn't open, return data from the last open day.
        var bars = await client.ListSnapshotsAsync(
            new LatestMarketDataListRequest(options.Symbols)
        );

        return bars.Select(bar =>
        {
            var currentBar = bar.Value.CurrentDailyBar;
            var previousBar = bar.Value.PreviousDailyBar;
            if (currentBar == null || previousBar == null)
            {
                throw new Exception($"Market data unavailable for {bar.Key}");
            }
            
            var stock = new Stock
            {
                Symbol = bar.Key,
                CurrentPrice = new StockPricePoint
                {
                    Low = currentBar.Low,
                    High = currentBar.High,
                    Open = currentBar.Open,
                    Close = currentBar.Close,
                    Vwap = currentBar.Vwap
                },
                ChangePercentage = (currentBar.Vwap - previousBar.Vwap) / currentBar.Close * 100,
            };

            return stock;
        }).ToList();
    }
}