let data;
let years = [];

// Margin object with properties for the four directions
// set the dimensions and margins of the graph
var margin = { top: 30, right: 30, bottom: 70, left: 60 },
	width = 1000 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

Promise.all([
	d3.csv('data/combined-data-2016.csv'),
	d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
])
	.then(loadData => {
		console.log('Data loading complete. Work with dataset.');

		var data = loadData[0]
		var topo = loadData[1]

		// Data processing
		// I thought about catching NaNs here, but it seems easier if I just handle that in 
		// each plots' function
		data.forEach(d => {
			d["People who report having friends or relatives they can count on"] = parseFloat(d["People who report having friends or relatives they can count on"])
			d["Share of the population using the Internet"] = parseFloat(d["Share of the population using the Internet"])
		});

		drawBarChart(
			data,
			"Entity",
			"People who report having friends or relatives they can count on",
			"#friends-or-relatives-bar-chart"
		);

		drawBarChart(
			data,
			"Entity",
			"Share of the population using the Internet",
			"#using-the-internet-bar-chart"
		);

		drawScatterPlot(
			data,
			"Share of the population using the Internet",
			"People who report having friends or relatives they can count on",
			"#scatterplot"
		)

		drawChoroplethMap(
			data,
			"Code",
			"People who report having friends or relatives they can count on",
			topo,
			[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
			d3.schemeBlues[9],
			"#friends-or-relatives-graph"
		)

		drawChoroplethMap(
			data,
			"Code",
			"Share of the population using the Internet",
			topo,
			[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
			d3.schemeBlues[9],
			"#using-the-internet-graph"
		)

	});

function drawBarChart(data, xAttr, yAttr, elementId) {
	data.sort(function (b, a) {
		return a[yAttr] - b[yAttr];
	});

	const svg = d3.select(elementId)
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`);

	// X axis
	var x = d3.scaleBand()
		.range([0, width])
		.domain(data.filter(d => !isNaN(d[yAttr])).map(d => { return d[xAttr]; }))
		.padding(0.2);
	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x))
		.selectAll("text")
		.attr("transform", "translate(-10,0)rotate(-45)")
		.style("text-anchor", "end");

	// Add Y axis
	var y = d3.scaleLinear()
		.domain([0, 100])
		.range([height, 0]);
	svg.append("g")
		.call(d3.axisLeft(y));

	// Bars
	svg.selectAll("mybar")
		.data(data)
		.enter()
		.append("rect")
		.attr("x", function (d) { return x(d[xAttr]); })
		.attr("y", function (d) { return y(d[yAttr]); })
		.attr("width", x.bandwidth())
		.attr("height", function (d) { return height - y(d[yAttr]); })
		.attr("fill", d3.schemeBlues[6][4])

}

function drawScatterPlot(data, xAttr, yAttr, elementId) {
	const svg = d3.select(elementId)
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`);

	// Add X axis
	var x = d3.scaleLinear()
		.domain([0, 100])
		.range([0, width]);
	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x));

	// Add Y axis
	var y = d3.scaleLinear()
		.domain([0, 100])
		.range([height, 0]);
	svg.append("g")
		.call(d3.axisLeft(y));

	// Add dots
	svg.append('g')
		.selectAll("dot")
		.data(data.filter(d => !isNaN(d[yAttr])))
		.enter()
		.append("circle")
		.attr("cx", function (d) { return x(d[xAttr]); })
		.attr("cy", function (d) { return y(d[yAttr]); })
		.attr("r", 1.5)
		.style("fill", d3.schemeBlues[6][5])
}

function drawChoroplethMap(loadData, key, value, topo, colorDomain, colorRange, elementId) {
	var svg = d3.select(elementId),
		width = +svg.attr("width"),
		height = +svg.attr("height");

	const projection = d3.geoMercator()
		.scale(70)
		.center([0, 20])
		.translate([width / 2, height / 2]);

	const path = d3.geoPath().projection(projection);

	// Map CSV values by ISO code
	const choroplethData = new Map();
	loadData.forEach(d => choroplethData.set(d[key], d[value]));

	const colorScale = d3.scaleThreshold()
		.domain(colorDomain)
		.range(colorRange);

	svg.append("g")
		.selectAll("path")
		.data(topo.features)
		.join("path")
		.attr("d", path)
		.attr("fill", d => {
			const val = choroplethData.get(d.id);
			if (val === undefined || isNaN(val)) {
				return "#cccfdc";
			}
			return colorScale(val || 0);
		});
}