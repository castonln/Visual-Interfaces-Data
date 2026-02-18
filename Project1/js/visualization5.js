var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

// Projection
var projection = d3.geoMercator()
  .scale(70)
  .center([0, 20])
  .translate([width / 2, height / 2]);

var path = d3.geoPath().projection(projection);

// Data structures
var map = new Map();
var colorScale = d3.scaleThreshold()
  .domain([80, 85, 90, 95, 100])
  .range(d3.schemeBlues[7]);

// Load data
Promise.all([
  d3.json("data/world.geojson"),
  d3.csv("data/people-who-report-having-friends-or-relatives-they-can-count-on.csv")
]).then(ready);

function ready([topo, csvData]) {

  // Load CSV values into the map
  csvData.forEach(d => {
    map.set(d.Code, +d["People who report having friends or relatives they can count on"]);
  });

  svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", d => {
      const value = map.get(d.id) || 0;
      return colorScale(value);
    });
}