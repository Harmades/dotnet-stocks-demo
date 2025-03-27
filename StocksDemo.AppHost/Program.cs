using System;
using Aspire.Hosting;
using Aspire.Hosting.ApplicationModel;
using Microsoft.Extensions.Configuration;

var builder = DistributedApplication.CreateBuilder(args);

builder.Configuration.AddUserSecrets<Program>();

var sql = builder.AddSqlServer("sql")
                 .WithLifetime(ContainerLifetime.Persistent)
                 .AddDatabase("database");

var alpacaKey = builder.AddParameter("alpacaApiKey", secret: true);
var alpacaSecret = builder.AddParameter("alpacaApiSecret", secret: true);

var apiService = builder.AddProject<Projects.StocksDemo_ApiService>("apiservice")
       .WithReference(sql)
       .WaitFor(sql)
       .WithEnvironment("StocksDemoConfiguration__AlpacaApiKey", alpacaKey)
       .WithEnvironment("StocksDemoConfiguration__AlpacaApiSecret", alpacaSecret);

builder.AddProject<Projects.StocksDemo_MigrationService>("migrations")
    .WithReference(sql)
    .WaitFor(sql);

var port = int.Parse(Environment.GetEnvironmentVariable("PORT")!);

builder.AddNpmApp("webfrontend", "../StocksDemo.Web")
    .WithReference(apiService)
    .WaitFor(apiService)
    .WithHttpsEndpoint(port: port, isProxied: false)
    .WithExternalHttpEndpoints();

apiService.WithEnvironment("StocksDemoConfiguration__FrontendUrl", $"https://localhost:{port.ToString()}");

builder.Build().Run();
