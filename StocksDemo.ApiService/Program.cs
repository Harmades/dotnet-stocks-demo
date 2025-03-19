using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// builder.AddSqlServerClient(connectionName: "database");

builder.Configuration.AddUserSecrets<WebApplication>();

// Add service defaults & Aspire client integrations.
builder.AddServiceDefaults();

builder.Services.AddCors();

// Add services to the container.
builder.Services.AddProblemDetails();
builder.Services.Configure<StocksDemoConfiguration>(builder.Configuration.GetSection(StocksDemoConfiguration.ConfigurationKey));
builder.Services.AddSingleton<IStocksService, StocksService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseExceptionHandler();

app.MapGet("/stocks/{symbol}", async (
    [FromRoute] string symbol,
    [FromServices] IStocksService stockService) => {
    return await stockService.GetStock(symbol);
});

app.MapGet("/stocks", async ([FromQuery(Name = "symbols")] string symbols, [FromServices] IStocksService stockService) => {
    var options = new StocksRequestOptions
    {
        Symbols = symbols?.Split(',').ToList()
    };
    return await stockService.GetStocks(options);
});

app.UseCors(configure => configure.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.MapDefaultEndpoints();
app.Run();
