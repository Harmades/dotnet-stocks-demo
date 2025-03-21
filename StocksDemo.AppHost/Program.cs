using Aspire.Hosting;
using Aspire.Hosting.ApplicationModel;
using Microsoft.Extensions.Configuration;

var builder = DistributedApplication.CreateBuilder(args);

builder.Configuration.AddUserSecrets<Program>();

var sql = builder.AddSqlServer("sql")
                 .WithLifetime(ContainerLifetime.Persistent);

var db = sql.AddDatabase("database");

var alpacaKey = builder.AddParameter("alpacaApiKey", secret: true);
var alpacaSecret = builder.AddParameter("alpacaApiSecret", secret: true);

var apiService = builder.AddProject<Projects.StocksDemo_ApiService>("apiservice")
       .WithReference(db)
       .WaitFor(db)
       .WithEnvironment("StocksDemoConfiguration__AlpacaApiKey", alpacaKey)
       .WithEnvironment("StocksDemoConfiguration__AlpacaApiSecret", alpacaSecret);

builder.AddNpmApp("webfrontend", "../StocksDemo.Web")
    .WithReference(apiService)
    .WaitFor(apiService)
    .WithExternalHttpEndpoints()
    .WithHttpsEndpoint(env: "PORT");
    

builder.Build().Run();
