// Store chart views globally so updateYear() can access them
const views = {};

// Embed all charts
vegaEmbed("#choropleth_map", "js/choropleth_map.vg.json", {mode: "vega-lite"})
  .then(res => views["choropleth_map"] = res.view)
  .catch(console.warn);

vegaEmbed("#asean_choropleth_map", "js/asean_choropleth_map.vg.json", {mode: "vega-lite"})
  .then(res => views["asean_choropleth_map"] = res.view)
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

vegaEmbed("#choropleth_map2", "js/choropleth_map2.vg.json", {mode: "vega-lite"})
  .then(res => {
    view = res.view;
    // initialise with 2022
    view.signal("yearSelection", 2022).run();
  })
  .catch(console.warn);

  // Called when slider moves
function updateYear(value) {
  console.log("Year selected:", value);

  // Loop through all charts that have the 'yearSelection' signal
  for (const key in views) {
    const view = views[key];
    try {
      view.signal("yearSelection", +value).run(); // send new year to chart
    } catch (e) {
      // Ignore charts without the signal
    }
  }

  // Optional: update a visible title element if you have one
  const title = document.getElementById("chartTitle");
  if (title) title.textContent = `Rice Consumption in Southeast Asia (${value})`;
  }