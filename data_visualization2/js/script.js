// Store chart views globally so updateYear() can access them
const views = {};
const worldConsSpec = "js/choropleth_map.vg.json";      // World Consumption
const aseanConsSpec = "js/asean_choropleth_map.vg.json"; // ASEAN Consumption
const worldYieldSpec = "js/choropleth_map2.vg.json";    // World Yield
const aseanYieldSpec = "js/asean_choropleth_map2.vg.json"; // ASEAN Yield

// --- DOM Elements ---
const consumptionBtn = document.getElementById("consumptionBtn");
const yieldBtn = document.getElementById("yieldBtn");
const areaSelect = document.getElementById("area-select"); // New: Get the dropdown
const mapContainer = document.getElementById("choropleth_map");

// --- State Variables ---
let currentFocusArea = areaSelect.value; // Initial focus area (e.g., 'Southeast Asia')
let currentMetric = "Consumption";      // Initial metric

// --- Core Logic to Determine and Switch Map ---

/**
 * Determines which of the four specs to load based on the current metric and focus area.
 * @param {string} metric - 'Consumption' or 'Yield'
 * @param {string} area - 'All Countries' or 'Southeast Asia'
 * @returns {string} The URL of the correct Vega-Lite spec.
 */
function getMapURL(metric, area) {
  if (metric === "Consumption") {
    return area === "Southeast Asia" ? aseanConsSpec : worldConsSpec;
  } else { // Metric is 'Yield'
    return area === "Southeast Asia" ? aseanYieldSpec : worldYieldSpec;
  }
}

/**
 * Handles the fading transition and map embedding.
 * @param {string} specURL - The URL of the Vega-Lite spec to load.
 */
function embedMap(specURL) {
  mapContainer.classList.add("fade-out");

  setTimeout(() => {
    vegaEmbed("#choropleth_map", specURL, { mode: "vega-lite" }).then(() => {
      mapContainer.classList.remove("fade-out");
    });
  }, 300); // Matches CSS fade timing
}

/**
 * Master function to update the map based on button/dropdown clicks.
 */
function updateMap() {
    const specToLoad = getMapURL(currentMetric, currentFocusArea);
    embedMap(specToLoad);
}


// --- Event Listeners ---

// 1. Initial Load (Default: Consumption, initial Focus Area)
const mapSpec = getMapURL(currentMetric, currentFocusArea);
vegaEmbed("#choropleth_map", mapSpec, { mode: "vega-lite" });
consumptionBtn.classList.add("active"); // Set initial active button

// 2. Metric Button Events
consumptionBtn.addEventListener("click", () => {
  if (currentMetric !== "Consumption") {
    currentMetric = "Consumption";
    consumptionBtn.classList.add("active");
    yieldBtn.classList.remove("active");
    updateMap();
  }
});

yieldBtn.addEventListener("click", () => {
  if (currentMetric !== "Yield") {
    currentMetric = "Yield";
    yieldBtn.classList.add("active");
    consumptionBtn.classList.remove("active");
    updateMap();
  }
});

// 3. Dropdown Event
areaSelect.addEventListener("change", (event) => {
  currentFocusArea = event.target.value;
  updateMap();
});

const expSankeySpec = "js/sankey_chart.vg.json";
const impSankeySpec = "js/sankey_chart2.vg.json";

const exportBtn = document.getElementById("exportBtn");
const importBtn = document.getElementById("importBtn");
const sankeyContainer = document.getElementById("sankey_chart");

let currentTrade = "Export";

// Only return Sankey specs now
function getTradeURL(trade) {
  return trade === "Export" ? expSankeySpec : impSankeySpec;
}

function embedSankey(specURL) {
  sankeyContainer.classList.add("fade-out");
  setTimeout(() => {
    vegaEmbed("#sankey_chart", specURL, { mode: "vega-lite" }).then(() => {
      sankeyContainer.classList.remove("fade-out");
    });
  }, 300);
}

function updateView() {
  const specToLoad = getTradeURL(currentTrade);
  embedSankey(specToLoad);
}

// --- INITIAL LOAD ---
const sankeySpec = getTradeURL(currentTrade);
vegaEmbed("#sankey_chart", sankeySpec, { mode: "vega-lite" });
exportBtn.classList.add("active");

// --- EVENT LISTENERS ---
exportBtn.addEventListener("click", () => {
  if (currentTrade !== "Export") {
    currentTrade = "Export";
    exportBtn.classList.add("active");
    importBtn.classList.remove("active");
    updateView();
  }
});

importBtn.addEventListener("click", () => {
  if (currentTrade !== "Import") {
    currentTrade = "Import";
    importBtn.classList.add("active");
    exportBtn.classList.remove("active");
    updateView();
  }
});

vegaEmbed("#isotype_dot_plot", "js/isotype_dot_plot.vg.json", {mode: "vega-lite"})
  .then(res => views["isotype_dot_plot"] = res.view)
  .catch(console.warn);

vegaEmbed("#treemap", "js/treemap.vg.json", {mode: "vega-lite"})
  .then(res => views["treemap"] = res.view)
  .catch(console.warn);

vegaEmbed("#heatmap", "js/heatmap.vg.json", {mode: "vega-lite"})
  .then(res => views["heatmap"] = res.view)
  .catch(console.warn);

vegaEmbed("#line_chart", "js/line_chart.vg.json", {mode: "vega-lite"})
  .then(res => views["line_chart"] = res.view)
  .catch(console.warn);

