# Welcome to dotnet-stocks-demo!

This project demonstrates some of my skills and practices as a .NET engineer. It's not meant to be a complete and usable app, but it should be enough to give you an idea of how I work.

# Prerequisites

- .NET 8 SDK
- Docker
- [Alpaca Trading API key](https://app.alpaca.markets/account/login)
- npm

# Get started

First, if you haven't trusted ASP.NET dev certificates yet, run the following command:
```bash
dotnet dev-certs https --trust
```

Add your Alpaca Trading API key/secret to your user secrets with the following commands:
```bash
cd StocksDemo.AppHost
dotnet user-secrets set "Parameters:alpacaApiKey" "<your-api-key>"
dotnet user-secrets set "Parameters:alpacaApiSecret" "<your-api-secret>"
```

Install npm dependencies:
```bash
cd StocksDemo.Web
npm i
```

Finally, run the following command to start the project:

```bash
cd StocksDemo.AppHost
dotnet run
```

You can now navigate to the URL indicated in your terminal, following ``Login to the dashboard at: ``. It will bring the .NET Aspire dashboard.