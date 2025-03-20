using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Alpaca.Markets;
using Microsoft.Extensions.Options;

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

        var bar = await client.GetHistoricalBarsAsync(
            new HistoricalBarsRequest(symbol, DateTime.Today.AddDays(-7), DateTime.Today, BarTimeFrame.Day)
        );

        var bars = bar.Items[symbol.ToUpperInvariant()];
        var stock = new Stock
        {
            Symbol = symbol,
            CurrentPrice = new StockPricePoint
            {
                Low = bars[0].Low,
                High = bars[0].High,
                Open = bars[0].Open,
                Close = bars[0].Close,
                
            },
            History = bars.Select(b => new StockHistory
            {
                Price = new StockPricePoint
                {
                    Low = b.Low,
                    High = b.High,
                    Open = b.Open,
                    Close = b.Close,
                },
                Vwap = b.Vwap,
                Volume = b.Volume,
                Date = b.TimeUtc
            }).ToList()
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

        var bars = await client.ListLatestBarsAsync(new LatestMarketDataListRequest(options.Symbols));

        return bars.Select(bar =>
        {
            var stock = new Stock
            {
                Symbol = bar.Key,
                CurrentPrice = new StockPricePoint
                {
                    Low = bar.Value.Low,
                    High = bar.Value.High,
                    Open = bar.Value.Open,
                    Close = bar.Value.Close,
                }
            };

            return stock;
        }).ToList();
    }
}