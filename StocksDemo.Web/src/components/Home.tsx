import React from "react";
import { StocksDemoApiClient, Stock } from "../clients/StocksDemoApiClient";
import { StocksComponent } from "./Stocks";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { getTheme, Separator } from "@fluentui/react";

declare let stocksDemoConfig: any;

export const Home: React.FC = () => {
  const theme = getTheme();
  return (
    <>
      <PanelGroup direction="vertical">
        <Panel>
          <div style={{ overflow: "auto", height: "100%" }}>
            <StocksComponent />
          </div>
        </Panel>
        <PanelResizeHandle style={{ backgroundColor: theme.palette.accent, height: '4px'  }} >
        </PanelResizeHandle>
        <Panel>
          bottom
        </Panel>
      </PanelGroup>
    </>
  );
}
