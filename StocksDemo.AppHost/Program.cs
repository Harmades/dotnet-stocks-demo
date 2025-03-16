var builder = DistributedApplication.CreateBuilder(args);

var apiService = builder.AddProject<Projects.StocksDemo_ApiService>("apiservice");

builder.AddNpmApp("webfrontend", "../StocksDemo.Web")
    .WithReference(apiService)
    .WaitFor(apiService)
    .WithExternalHttpEndpoints()
    .WithHttpsEndpoint(env: "PORT");
    

builder.Build().Run();
