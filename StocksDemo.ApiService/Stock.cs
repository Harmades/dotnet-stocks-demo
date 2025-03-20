using System.Collections.Generic;

public record Stock
{
    public required string Symbol { get; init; }
    public required StockPricePoint CurrentPrice { get; init; }
    public List<StockHistory>? History { get; init; }
    public required decimal ChangePercentage { get; init; }
}