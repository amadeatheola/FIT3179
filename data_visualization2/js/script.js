// Store chart views globally so updateYear() can access them
const views = {};

function updateYear(value) {
  document.getElementById("yearValue").textContent = value;

  // If you have a Vega chart that listens to a signal called 'selectedYear', update it too:
  vegaEmbed("#choropleth_map2", "js/yrchoropleth_map.vg.json", {
    actions: false
  }).then(function(result) {
    result.view.signal("selectedYear", +value).run();
  });
}

  // Set default year on load
window.onload = function () {
  const slider = document.getElementById("yearSlider");
  const yearSpan = document.getElementById("yearValue");

  slider.value = 2022; // default value
  yearSpan.textContent = slider.value;

  // Initial call to render the chart for default year
  updateYear(slider.value);
};

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

vegaEmbed("#choropleth_map2", "js/yrchoropleth_map.vg.json").then(function(result) {
  document.getElementById("yearSlider").addEventListener("input", function () {
    const year = +this.value;
    document.getElementById("yearValue").textContent = year;
    result.view.signal("selectedYear", year).run();
  });

  // Set initial year value in span
  document.getElementById("yearValue").textContent = document.getElementById("yearSlider").value;
});

