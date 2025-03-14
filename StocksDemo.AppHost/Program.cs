var builder = DistributedApplication.CreateBuilder(args);

var apiService = builder.AddProject<Projects.StocksDemo_ApiService>("apiservice");

builder.AddProject<Projects.StocksDemo_Web>("webfrontend")
    .WithExternalHttpEndpoints()
    .WithReference(apiService)
    .WaitFor(apiService);

builder.Build().Run();
