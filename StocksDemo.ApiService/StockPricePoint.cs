public record StockPricePoint
{
    public decimal Low { get; init; }
    public decimal High { get; init; }
    public decimal Open { get; init; }
    public decimal Close { get; init; }
    public decimal Vwap { get; init; }
}