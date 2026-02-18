// a3-vis.js
// This file renders all A3 Vega-Lite charts into the divs in iat355-a3.html

const LONG = "videogames_long.csv";
const WIDE = "videogames_wide.csv";

// Optional embed config
const embedOpts = { actions: false };

// Example placeholder chart (replace with your real specs)
const vis1a = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: { url: LONG },
  mark: "bar",
  encoding: {
    x: { field: "genre", type: "nominal" },
    y: { aggregate: "sum", field: "sales_amount", type: "quantitative" }
  }
};

vegaEmbed("#vis1a", vis1a, embedOpts);
