import React from "react";
import {AppRouter} from "./router";
import { SimpleSpanProcessor, WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { ZoneContextManager } from "@opentelemetry/context-zone";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions'
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-proto";
import { initializeIcons, ThemeProvider } from "@fluentui/react";
const { events } = require('@opentelemetry/api-events');
const { EventLoggerProvider } = require('@opentelemetry/sdk-events');
const {
  LoggerProvider,
  SimpleLogRecordProcessor,
  ConsoleLogRecordExporter,
} = require('@opentelemetry/sdk-logs');

declare let stocksDemoConfig: any;

function parseDelimitedValues(headers: string): Record<string, string> {
  const headersArray = headers.split(','); // Split by comma
  const result: any = {};

  headersArray.forEach(header => {
      const [key, value] = header.split('='); // Split by equal sign
      result[key.trim()] = value.trim(); // Add to the object, trimming spaces
  });

  return result;
}

const attributes = parseDelimitedValues(stocksDemoConfig.OTEL_RESOURCE_ATTRIBUTES);
attributes[ATTR_SERVICE_NAME] = 'stocksdemo-web';

const tracerProvider = new WebTracerProvider({
  spanProcessors: [new SimpleSpanProcessor(new OTLPTraceExporter({
    url: `${stocksDemoConfig.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/traces`,
    headers: parseDelimitedValues(stocksDemoConfig.OTEL_EXPORTER_OTLP_HEADERS)
  }))],
  resource: new Resource(attributes),
  });

tracerProvider.register({
  contextManager: new ZoneContextManager(),
});

registerInstrumentations({
  instrumentations: [getWebAutoInstrumentations()],
})

// The Events SDK has a dependency on the Logs SDK.
// Any processing of events (e.g. export) is done through the Logs SDK.
const loggerProvider = new LoggerProvider({
  resource: new Resource(attributes),
});
loggerProvider.addLogRecordProcessor(
  new SimpleLogRecordProcessor(new OTLPLogExporter({
    url: `${stocksDemoConfig.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/logs`,
    headers: parseDelimitedValues(stocksDemoConfig.OTEL_EXPORTER_OTLP_HEADERS),
  }))
);

// Register a global EventLoggerProvider.
// This would be used by instrumentations, similar to how the global TracerProvider,
// LoggerProvider and MeterProvider work.
const eventLoggerProvider = new EventLoggerProvider(loggerProvider);
events.setGlobalEventLoggerProvider(eventLoggerProvider);

// Get an EventLogger from the global EventLoggerProvider
const eventLogger = events.getEventLogger('default');

// Emit an event
eventLogger.emit({
  name: 'my-domain.my-event',
  data: {
    field1: 'abc',
    field2: 123
  }
});

// Shutdown is done directly on the LoggerProvider
loggerProvider.shutdown();

initializeIcons();

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
