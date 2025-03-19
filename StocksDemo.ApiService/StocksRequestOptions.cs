using System.Collections.Generic;

public record StocksRequestOptions
{
    public List<string>? Symbols { get; init; }
}