var friendsOrRelativesSvg = d3.select("#friends-or-relatives-graph"),
  width = +friendsOrRelativesSvg.attr("width"),
  height = +friendsOrRelativesSvg.attr("height");

var usingTheInternetSvg = d3.select("#using-the-internet-graph"),
  width = +usingTheInternetSvg.attr("width"),
  height = +usingTheInternetSvg.attr("height");

// Map and projection
const path = d3.geoPath();
const projection = d3.geoMercator()
  .scale(70)
  .center([0, 20])
  .translate([width / 2, height / 2]);

// Data and color scale
var friendsOrRelativesData = new Map()
var usingTheInternetData = new Map()

const usingTheInternetDomain = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
const friendsOrRelativesDomain = [80, 85, 90, 95, 100]
const colorScale = d3.scaleThreshold()
  .domain(usingTheInternetDomain)
  .range(d3.schemeBlues[7]);

// Load external data and boot
Promise.all([
  d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
  d3.csv("../data/combined_data.csv", function (d) {
    friendsOrRelativesData.set(d["Code"], +d["People who report having friends or relatives they can count on"]) // create table
  },),
  d3.csv("../data/share-of-individuals-using-the-internet-2016.csv", function (d) {
    usingTheInternetData.set(d["Code"], d["Share of the population using the Internet"])
  },),
]).then(function (loadData) {
  let topo = loadData[0]

  // Draw the map
  usingTheInternetSvg.append("g")
    .selectAll("path")
    .data(topo.features)
    .join("path")
    // draw each country
    .attr("d", d3.geoPath()
      .projection(projection)
    )
    // set the color of each country
    .attr("fill", function (d) {
      d.total = usingTheInternetData.get(d.id) || 0;
      return colorScale(d.total);
    })

  // Draw the map
  friendsOrRelativesSvg.append("g")
    .selectAll("path")
    .data(topo.features)
    .join("path")
    // draw each country
    .attr("d", d3.geoPath()
      .projection(projection)
    )
    // set the color of each country
    .attr("fill", function (d) {
      d.total = friendsOrRelativesData.get(d.id) || 0;
      return colorScale(d.total);
    })
})