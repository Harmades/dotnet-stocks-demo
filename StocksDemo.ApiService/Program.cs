using System.Linq;
using Alpaca.Markets;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

builder.AddSqlServerClient(connectionName: "database");

builder.Configuration.AddUserSecrets<WebApplication>();

// Add service defaults & Aspire client integrations.
builder.AddServiceDefaults();

builder.AddSqlServerDbContext<ApplicationDbContext>(connectionName: "database");

builder.Services.AddCors();

// Add services to the container.
builder.Services.AddProblemDetails();
builder.Services.Configure<StocksDemoConfiguration>(builder.Configuration.GetSection(StocksDemoConfiguration.ConfigurationKey));
builder.Services.AddSingleton<IAlpacaDataClient>((services) =>
{
    var configuration = services.GetRequiredService<IOptions<StocksDemoConfiguration>>().Value;
    var securityKey = new SecretKey(configuration.AlpacaApiKey, configuration.AlpacaApiSecret);
    return Alpaca.Markets.Environments.Paper.GetAlpacaDataClient(securityKey);
});
builder.Services.AddSingleton<IStocksService, StocksService>();

builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument();

var app = builder.Build();

app.UseOpenApi();
app.UseSwaggerUi(configure =>
{
    configure.DocExpansion = "list";
});

// Configure the HTTP request pipeline.
app.UseExceptionHandler();

app.MapIdentityApi<IdentityUser>();

app.MapGet("/stocks/{symbol}", async (
    [FromRoute] string symbol,
    [FromServices] IStocksService stockService) => {
    return await stockService.GetStock(symbol);
});

app.MapGet("/stocks", async ([FromQuery(Name = "symbols")] string? symbols, [FromServices] IStocksService stockService) =>
{
    var options = new StocksRequestOptions
    {
        Symbols = symbols?.Split(',').ToList()
    };
    return await stockService.GetStocks(options);
})
.RequireAuthorization();

app.MapPost("/logout", async (SignInManager<IdentityUser> signInManager, [FromBody] object empty) =>
{
    if (empty != null)
    {
        await signInManager.SignOutAsync();
        return Results.Ok();
    }
    return Results.Unauthorized();
})
.RequireAuthorization();

app.MapGet("/", () => Results.Redirect("/swagger"));


var configuration = app.Services.GetRequiredService<IOptions<StocksDemoConfiguration>>().Value;
app.UseCors(configure => configure.WithOrigins(configuration.FrontendUrl).AllowAnyMethod().AllowAnyHeader().AllowCredentials());

app.UseDeveloperExceptionPage();

app.MapDefaultEndpoints();

app.Run();
