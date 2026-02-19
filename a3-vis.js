
const LONG = "videogames_long.csv";
const WIDE = "videogames_wide.csv";


const embedOpts = { actions: false };


const vis1a = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Global Sales Concentration by Company",
  "data": { "url": WIDE },
  "width": 600,
  "height": 400,
  "transform": [
    {
      "calculate": "indexof(['PS','PS2','PS3','PS4','PSP','PSV'], datum.Platform) >= 0 ? 'Sony' : indexof(['NES','SNES','N64','GC','Wii','WiiU','GB','GBA','DS','3DS'], datum.Platform) >= 0 ? 'Nintendo' : indexof(['XB','X360','XOne'], datum.Platform) >= 0 ? 'Microsoft' : 'Other'",
      "as": "company_group"
    }
  ],
  "mark": "bar",
  "encoding": {
    "x": {
      "field": "company_group",
      "type": "nominal",
      "sort": "-y",
      "title": "Company"
    },
    "y": {
      "field": "Global_Sales",
      "type": "quantitative",
      "aggregate": "sum",
      "title": "Total Global Sales (Millions)"
    },
    "color": {
      "field": "company_group",
      "type": "nominal",
      "title": "Company",
      "scale": {"scheme": "tableau10"}
    },
    "tooltip": [
      { "field": "company_group", "type": "nominal", "title": "Company" },
      { "field": "Global_Sales", "aggregate": "sum", "type": "quantitative", "title": "Total Sales (M)", "format": ".2f" }
    ]
  }
};


const vis1b = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "How different platforms specialize in different genres in terms of global sales",
  "data": { "url": WIDE },
  "width": 600,
  "height": 400,
  "transform": [
    {
      "filter": "datum.Platform == 'PS2' || datum.Platform == 'X360' || datum.Platform == 'PS3' || datum.Platform == 'Wii' || datum.Platform == 'PS' || datum.Platform == 'DS'"
    }
  ],
  "mark": "rect",
  "encoding": {
    "x": {
      "field": "Platform",
      "type": "nominal",
      "title": "Platform"
    },
    "y": {
      "field": "Genre",
      "type": "nominal",
      "title": "Genre",
      "sort": "-color"
    },
    "color": {
      "field": "Global_Sales",
      "type": "quantitative",
      "aggregate": "sum",
      "title": "Total Sales (M)",
      "scale": {"scheme": "viridis"} 
    },
    "tooltip": [
      { "field": "Platform", "type": "nominal" },
      { "field": "Genre", "type": "nominal" },
      { "field": "Global_Sales", "aggregate": "sum", "type": "quantitative", "format": ".2f", "title": "Total Sales" }
    ]
  },
  "config": {
    "view": { "stroke": "transparent" }
  }
};


const vis2a = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Global Sales Trends for Major Platforms",
  "data": { "url": WIDE },
  "width": 600,
  "height": 400,
  "transform": [
    {
      "filter": "datum.Platform == 'PS2' || datum.Platform == 'PS3' || datum.Platform == 'PS4' || datum.Platform == 'X360' || datum.Platform == 'Wii'"
    }
  ],
  "mark": {
    "type": "line",
    "point": true 
  },
  "encoding": {
    "x": {
      "field": "Year",
      "type": "quantitative",
      "title": "Year",
      "axis": {"format": "d"} 
    },
    "y": {
      "field": "Global_Sales",
      "type": "quantitative",
      "aggregate": "sum",
      "title": "Total Global Sales (Millions)"
    },
    "color": {
      "field": "Platform",
      "type": "nominal",
      "title": "Platform"
    },
    "tooltip": [
      { "field": "Year", "type": "quantitative", "title": "Year" },
      { "field": "Platform", "type": "nominal" },
      { "field": "Global_Sales", "aggregate": "sum", "type": "quantitative", "format": ".2f", "title": "Total Sales" }
    ]
  }
};


const vis2b = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Evolution of Genre Sales by Decade",
  "data": { "url": WIDE },
  "width": 600,
  "height": 400,
  "transform": [
    {
      "calculate": "datum.Year < 1990 ? '1980s' : datum.Year < 2000 ? '1990s' : datum.Year < 2010 ? '2000s' : '2010s'",
      "as": "decade"
    }
  ],
  "mark": "rect",
  "encoding": {
    "x": {
      "field": "decade",
      "type": "nominal",
      "title": "Decade",
      "sort": ["1980s", "1990s", "2000s", "2010s"]
    },
    "y": {
      "field": "Genre",
      "type": "nominal",
      "title": "Genre"
    },
    "color": {
      "field": "Global_Sales",
      "type": "quantitative",
      "aggregate": "sum",
      "title": "Global Sales (M)",
      "scale": {"scheme": "magma"} 
    },
    "tooltip": [
      { "field": "decade", "type": "nominal", "title": "Decade" },
      { "field": "Genre", "type": "nominal", "title": "Genre" },
      { "field": "Global_Sales", "aggregate": "sum", "type": "quantitative", "format": ".2f", "title": "Total Sales" }
    ]
  },
  "config": {
    "view": { "stroke": "transparent" }
  }
};


const vis3a = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Western Markets vs Japan: Sales Comparison",
  "data": { "url": WIDE },
  "width": 600,
  "height": 400,
  "transform": [
    
    { 
      "calculate": "toNumber(datum.NA_Sales) + toNumber(datum.EU_Sales)", 
      "as": "West" 
    },
    {
      "calculate": "toNumber(datum.JP_Sales)",
      "as": "Japan"
    },
  
    { 
      "fold": ["West", "Japan"], 
      "as": ["Market", "Sales"] 
    },
   
    {
      "aggregate": [{ "op": "sum", "field": "Sales", "as": "Total" }],
      "groupby": ["Platform", "Market"]
    },
    
    {
      "joinaggregate": [{ "op": "sum", "field": "Total", "as": "all_sales" }],
      "groupby": ["Platform"]
    },
    
    { "filter": "datum.all_sales > 50" }
  ],
  "mark": "bar",
  "encoding": {
    "y": {
      "field": "Platform",
      "type": "nominal",
      "sort": "-x",
      "title": "Platform"
    },
    "x": {
      "field": "Total",
      "type": "quantitative",
      "title": "Sales (Millions)"
    },
    "color": {
      "field": "Market",
      "type": "nominal",
      "scale": {
        "domain": ["West", "Japan"],
        "range": ["#4c78a8", "#e15759"]
      },
      "title": "Market"
    },
    "tooltip": [
      { "field": "Platform", "type": "nominal" },
      { "field": "Market", "type": "nominal" },
      { "field": "Total", "type": "quantitative", "format": ".2f" }
    ]
  }
};

vegaEmbed("#vis3a", vis3a, embedOpts);


const vis3b = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Regional Sales Composition by Platform (Top 8 Platforms, % Share)",
  "data": { "url": WIDE },
  "width": 600,
  "height": 400,
  "transform": [
   
    {
      "fold": ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"],
      "as": ["region", "sales"]
    },
  
    {
      "calculate": "split(datum.region, '_')[0]",
      "as": "region_label"
    },
   
    {
      "aggregate": [{"op": "sum", "field": "sales", "as": "region_sales"}],
      "groupby": ["Platform", "region_label"]
    },
    
    {
      "joinaggregate": [{"op": "sum", "field": "region_sales", "as": "platform_total"}],
      "groupby": ["Platform"]
    },
  
    {
      "window": [{"op": "dense_rank", "as": "rank"}],
      "sort": [{"field": "platform_total", "order": "descending"}]
    },
   
    { "filter": "datum.rank <= 8" },
    
    {
      "calculate": "datum.region_sales / datum.platform_total",
      "as": "share"
    }
  ],
  "mark": "bar",
  "encoding": {
    "x": {
      "field": "Platform",
      "type": "nominal",
      "sort": {"field": "platform_total", "order": "descending"},
      "title": "Gaming Platform"
    },
    "y": {
      "field": "region_sales",
      "type": "quantitative",
      "stack": "normalize",
      "axis": {"format": ".0%"},
      "title": "Share of Global Sales"
    },
    "color": {
      "field": "region_label",
      "type": "nominal",
      "sort": ["NA", "EU", "JP", "Other"],
      "scale": {"scheme": "tableau10"},
      "title": "Region"
    },
    "tooltip": [
      { "field": "Platform", "type": "nominal" },
      { "field": "region_label", "type": "nominal", "title": "Region" },
      { "field": "region_sales", "type": "quantitative", "title": "Sales (M)", "format": ".2f" },
      { "field": "share", "type": "quantitative", "title": "Market Share", "format": ".1%" }
    ]
  }
};


const vis4a = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Top 8 Publishers: Competition and Dominance by Decade",
  "data": { "url": WIDE },
  "transform": [
   
    {
      "calculate": "datum.Year < 1990 ? '1980s' : datum.Year < 2000 ? '1990s' : datum.Year < 2010 ? '2000s' : '2010s'",
      "as": "decade"
    },
   
    {
      "aggregate": [{"op": "sum", "field": "Global_Sales", "as": "pub_decade_sales"}],
      "groupby": ["Publisher", "decade"]
    },
    
    {
      "joinaggregate": [{"op": "sum", "field": "pub_decade_sales", "as": "total_pub_sales"}],
      "groupby": ["Publisher"]
    },
    {
      "window": [{"op": "dense_rank", "as": "rank"}],
      "sort": [{"field": "total_pub_sales", "order": "descending"}]
    },
    
    { "filter": "datum.rank <= 8" }
  ],
  "mark": "bar",
  "encoding": {
    "column": {
      "field": "decade",
      "type": "nominal",
      "sort": ["1980s", "1990s", "2000s", "2010s"],
      "title": "Decade"
    },
    "y": {
      "field": "Publisher",
      "type": "nominal",
      "sort": "-x",
      "title": null
    },
    "x": {
      "field": "pub_decade_sales",
      "type": "quantitative",
      "title": "Sales (Millions)"
    },
    "color": {
      "field": "Publisher",
      "type": "nominal",
      "scale": {"scheme": "tableau10"},
      "legend": null
    },
    "tooltip": [
      { "field": "Publisher", "type": "nominal" },
      { "field": "decade", "type": "nominal" },
      { "field": "pub_decade_sales", "type": "quantitative", "title": "Decade Sales (M)", "format": ".2f" }
    ]
  },
  "config": {
    "view": {"stroke": "transparent"}
  }
};


const vis4b = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Genre Specialization of Top Publishers (Total Sales)",
  "data": { "url": WIDE },
  "width": 600,
  "height": 400,
  "transform": [
   
    {
      "filter": {
        "field": "Publisher",
        "oneOf": [
          "Nintendo",
          "Sony Computer Entertainment",
          "Electronic Arts",
          "THQ",
          "Activision",
          "Take-Two Interactive",
          "Ubisoft",
          "Konami Digital Entertainment"
        ]
      }
    }
  ],
  "mark": "rect",
  "encoding": {
    "x": {
      "field": "Publisher",
      "type": "nominal",
      "title": "Publisher",
      "axis": { "labelAngle": -35 }
    },
    "y": {
      "field": "Genre",
      "type": "nominal",
      "title": "Genre",
      "sort": "-color"
    },
    "color": {
      "field": "Global_Sales",
      "type": "quantitative",
      "aggregate": "sum",
      "title": "Total Sales (Millions)",
      "scale": { "scheme": "viridis" }
    },
    "tooltip": [
      { "field": "Publisher", "type": "nominal", "title": "Publisher" },
      { "field": "Genre", "type": "nominal", "title": "Genre" },
      { "field": "Global_Sales", "aggregate": "sum", "type": "quantitative", "title": "Sales (Millions)", "format": ".2f" }
    ]
  },
  "config": {
    "view": { "stroke": "transparent" }
  }
};



vegaEmbed("#vis1b", vis1b, embedOpts);
vegaEmbed("#vis1a", vis1a, embedOpts);
vegaEmbed("#vis2a", vis2a, embedOpts);
vegaEmbed("#vis2b", vis2b, embedOpts);
vegaEmbed("#vis3a", vis3a, embedOpts);
vegaEmbed("#vis3b", vis3b, embedOpts);
vegaEmbed("#vis4a", vis4a, embedOpts);
vegaEmbed("#vis4b", vis4b, embedOpts);
