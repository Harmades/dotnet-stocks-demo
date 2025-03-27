declare const stocksDemoConfig: Config;

export interface Config {
    OTEL_EXPORTER_OTLP_ENDPOINT: string,
    OTEL_EXPORTER_OTLP_HEADERS: string,
    OTEL_RESOURCE_ATTRIBUTES: string,
    STOCKSDEMOAPI_URL: string
}

export const getConfig = (): Config => {
    return stocksDemoConfig;
};