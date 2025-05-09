using StocksDemo.MigrationService;

var builder = Host.CreateApplicationBuilder(args);
builder.AddServiceDefaults();
builder.Services.AddHostedService<Worker>();

builder.Services.AddOpenTelemetry()
    .WithTracing(tracing => tracing.AddSource(Worker.ActivitySourceName));
    
builder.AddSqlServerDbContext<ApplicationDbContext>(connectionName: "database");

var host = builder.Build();
host.Run();
