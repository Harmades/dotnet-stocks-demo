import React from "react";
import { StocksDemoApiClient, Stock } from "../clients/StocksDemoApiClient";
import { StocksComponent } from "./Stocks";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { getTheme, ISeparatorStyles, Separator } from "@fluentui/react";

declare let stocksDemoConfig: any;

export const Home: React.FC = () => {
  const separatorStyles: Partial<ISeparatorStyles> = {
    root: {
      top: '-20px',
      selectors: {
        '::before': {
          height: '4px', // Adjust the thickness here
          backgroundColor: getTheme().palette.themePrimary,
        },
      },
    },
    content: {
      top: '4px'
    }
  };

  return (
    <>
      <PanelGroup direction="vertical">
        <Panel>
          <div style={{ overflow: "auto", height: "100%" }}>
            <StocksComponent />
          </div>
        </Panel>
        <Separator styles={separatorStyles}>
          <PanelResizeHandle>
            ☰
          </PanelResizeHandle>
        </Separator>
        <Panel>
        </Panel>
      </PanelGroup>
    </>
  );
}
