var builder = DistributedApplication.CreateBuilder(args);

var sql = builder.AddSqlServer("sql")
                 .WithLifetime(ContainerLifetime.Persistent);

var db = sql.AddDatabase("database");

var apiService = builder.AddProject<Projects.StocksDemo_ApiService>("apiservice")
       .WithReference(db)
       .WaitFor(db);

builder.AddNpmApp("webfrontend", "../StocksDemo.Web")
    .WithReference(apiService)
    .WaitFor(apiService)
    .WithExternalHttpEndpoints()
    .WithHttpsEndpoint(env: "PORT");
    

builder.Build().Run();
