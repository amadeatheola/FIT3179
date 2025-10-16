// Store chart views globally so updateYear() can access them
const views = {};
// Your two Vega-Lite specs
const consumptionSpec = "js/choropleth_map.vg.json";
const yieldSpec = "js/choropleth_map2.vg.json";

// Default: show consumption
vegaEmbed("#choropleth_map", consumptionSpec, { mode: "vega-lite" });

// Button behavior
const consumptionBtn = document.getElementById("consumptionBtn");
const yieldBtn = document.getElementById("yieldBtn");
const mapContainer = document.getElementById("choropleth_map");

// Helper to fade transition
function switchMap(spec, activeBtn, inactiveBtn) {
  mapContainer.classList.add("fade-out");

  setTimeout(() => {
    vegaEmbed("#choropleth_map", spec, { mode: "vega-lite" }).then(() => {
      mapContainer.classList.remove("fade-out");
    });
  }, 300); // Matches CSS fade timing

  activeBtn.classList.add("active");
  inactiveBtn.classList.remove("active");
}

  // Button events
consumptionBtn.addEventListener("click", () =>
  switchMap(consumptionSpec, consumptionBtn, yieldBtn)
);
yieldBtn.addEventListener("click", () =>
  switchMap(yieldSpec, yieldBtn, consumptionBtn)
);

vegaEmbed("#choropleth_map2", "js/choropleth_map2.vg.json", {mode: "vega-lite"})
  .then(res => views["choropleth_map2"] = res.view)
  .catch(console.warn);

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

