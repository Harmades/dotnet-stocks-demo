using System;

public record StockHistory
{
    public required StockPricePoint Price { get; init; }
    public decimal Vwap { get; init; }
    public decimal Volume { get; init; }
    public DateTime Date { get; init; }
}