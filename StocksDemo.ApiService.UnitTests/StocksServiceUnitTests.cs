using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Alpaca.Markets;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace StocksDemo.ApiService.UnitTests;

public class StocksServiceUnitTests
{
    private readonly Mock<IAlpacaDataClient> client;

    public StocksServiceUnitTests()
    {
        client = new Mock<IAlpacaDataClient>();
    }

    [Fact]
    public async Task GetStock_Empty_Throws_ArgumentException()
    {
        // Arrange
        var stocksService = new StocksService(client.Object);

        // Act & Assert
        await Assert.ThrowsAsync<ArgumentException>(() => stocksService.GetStock(string.Empty));
    }

    [Fact]
    public async Task GetStocks_NullSymbols_Returns_MostActive()
    {
        // Arrange
        var mockStock1 = new Mock<IActiveStock>();
        mockStock1.SetupGet(stock => stock.Symbol).Returns("AAPL");
        var mockStock2 = new Mock<IActiveStock>();
        mockStock2.SetupGet(stock => stock.Symbol).Returns("MSFT");
        client
            .Setup(client => client.ListMostActiveStocksByVolumeAsync(It.IsAny<int>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<IActiveStock> { mockStock1.Object, mockStock2.Object });

        client
            .Setup(client => client.ListLatestBarsAsync(It.IsAny<LatestMarketDataListRequest>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new Dictionary<string, IBar>());

        var stocksService = new StocksService(client.Object);

        // Act
        var result = await stocksService.GetStocks(new());

        // Assert
        client.Verify(client =>
            client.ListLatestBarsAsync(It.Is<LatestMarketDataListRequest>(
                request => request.Symbols.First() == "AAPL" &&
                            request.Symbols.Last() == "MSFT"),
                It.IsAny<CancellationToken>()),
            Times.Once);
    }
}
