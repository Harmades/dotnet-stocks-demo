public record Quote
{
    public required string Symbol { get; init; }
    
    public required decimal Price { get; init; }
}