using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Xunit;

namespace StocksDemo.ApiService.UnitTests;

public class StocksServiceUnitTests
{
    [Fact]
    public async Task GetStock_Empty_Throws_ArgumentException()
    {
        var configuration = new StocksDemoConfiguration
        {
            AlpacaApiKey = "key",
            AlpacaApiSecret = "secret"
        };
        var stocksService = new StocksService(Options.Create(configuration));

        await Assert.ThrowsAsync<ArgumentException>(() => stocksService.GetStock(string.Empty));
    }
}
