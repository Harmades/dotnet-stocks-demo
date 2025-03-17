using System.Threading.Tasks;

public interface IStocksService
{
    Task<Quote> GetQuote(string symbol);
}