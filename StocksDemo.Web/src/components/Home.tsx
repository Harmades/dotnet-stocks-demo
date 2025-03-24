import React from "react";
import { StocksComponent } from "./Stocks";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { getTheme, ISeparatorStyles, SearchBox, Separator, Stack } from "@fluentui/react";
import { StockDetailsComponent } from "./StockDetails";

export const Home: React.FC = () => {
  const [symbols, setSymbols] = React.useState<string[] | null>(null);
  const [selectedSymbol, setSelectedSymbol] = React.useState<string | null>(null);
  
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

  const parseSearchText = (searchText: string | null): void => {
    searchText = searchText?.trim() ?? null;
    if (searchText == null || searchText === '') {
      setSymbols(null);
      return;
    }
    let symbols = searchText.split(',');
    setSymbols(symbols);
  };

  return (
    <>
      <PanelGroup direction="vertical">
        <Panel>
          <div style={{ overflow: "auto", height: "100%" }}>
            <Stack styles={{ root: { marginTop: '4px' }}}>
              <Stack.Item>
                  <SearchBox underlined onSearch={parseSearchText} placeholder="MSFT,META,AMD" />
              </Stack.Item>
              <Stack.Item>
                <StocksComponent symbols={symbols} setSelectedSymbol={setSelectedSymbol} />
              </Stack.Item>
            </Stack>
          </div>
        </Panel>
        <Separator styles={separatorStyles}>
          <PanelResizeHandle>
            ☰
          </PanelResizeHandle>
        </Separator>
        <Panel>
          {selectedSymbol != null
            ? <StockDetailsComponent symbol={selectedSymbol} />
            : <div style={{ textAlign: "center" }}>Select a stock to view details.</div>
          }
        </Panel>
      </PanelGroup>
    </>
  );
}
