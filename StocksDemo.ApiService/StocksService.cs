using System;
using System.Threading.Tasks;
using Alpaca.Markets;
using Microsoft.Extensions.Options;

public class StocksService : IStocksService
{
    private readonly StocksDemoConfiguration configuration;
    private readonly IAlpacaDataClient client;

    public StocksService(IOptions<StocksDemoConfiguration> configurationOptions)
    {
        configuration = configurationOptions.Value;
        var securityKey = new SecretKey(configuration.AlpacaApiKey, configuration.AlpacaApiSecret);
        client = Environments.Paper.GetAlpacaDataClient(securityKey);
    }

    public async Task<Quote> GetQuote(string symbol)
    {
        if (string.IsNullOrEmpty(symbol))
        {
            throw new ArgumentException("Symbol cannot be empty", nameof(symbol));
        }

        var quote = await client.GetLatestQuoteAsync(new LatestMarketDataRequest(symbol));

        return new Quote
        {
            Symbol = quote.Symbol,
            Price = (quote.AskPrice + quote.BidPrice) / 2
        };
    }
}