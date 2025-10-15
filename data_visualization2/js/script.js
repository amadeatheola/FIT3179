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
  .then(res => views["choropleth_map2"] = res.view)
  .catch(console.warn);

