using Alpaca.Markets;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// builder.AddSqlServerClient(connectionName: "database");

builder.Configuration.AddUserSecrets<WebApplication>();

// Add service defaults & Aspire client integrations.
builder.AddServiceDefaults();

builder.Services.AddCors();

// Add services to the container.
builder.Services.AddProblemDetails();
builder.Services.Configure<StocksDemoConfiguration>(builder.Configuration.GetSection(StocksDemoConfiguration.ConfigurationKey));

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseExceptionHandler();

app.MapGet("/stocks/{symbol}", async (string symbol, [FromServices] IOptions<StocksDemoConfiguration> configurationOptions) => {
    var configuration = configurationOptions.Value;
    var securityKey = new SecretKey(configuration.AlpacaApiKey, configuration.AlpacaApiSecret);
    var client = Alpaca.Markets.Environments.Paper.GetAlpacaDataClient(securityKey);

    var quote = await client.GetLatestQuoteAsync(new LatestMarketDataRequest(symbol));

    return new Quote
    {
        Symbol = quote.Symbol,
        Price = (quote.AskPrice + quote.BidPrice) / 2
    };
});

app.UseCors(configure => configure.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.MapDefaultEndpoints();
app.Run();
