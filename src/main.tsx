import { setAssetPath as setCalciteAssetsPath } from "@esri/calcite-components/dist/components";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// CDN hosted assets for Calcite
setCalciteAssetsPath("https://js.arcgis.com/calcite-components/2.13.2/assets");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
