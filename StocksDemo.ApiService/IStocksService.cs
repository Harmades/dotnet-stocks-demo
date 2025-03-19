using System.Collections.Generic;
using System.Threading.Tasks;

public interface IStocksService
{
    Task<Stock> GetStock(string symbol);

    Task<List<Stock>> GetStocks(StocksRequestOptions options);
}