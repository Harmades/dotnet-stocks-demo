public record StocksDemoConfiguration
{
    public const string ConfigurationKey = nameof(StocksDemoConfiguration);
    
    public required string AlpacaApiKey { get; init; }

    public required string AlpacaApiSecret { get; init; }

    public required string FrontendUrl { get; init; }
}