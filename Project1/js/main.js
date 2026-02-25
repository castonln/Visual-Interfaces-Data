let data;
let years = [];

// Margin object with properties for the four directions
// set the dimensions and margins of the graph
var margin = { top: 30, right: 30, bottom: 70, left: 60 },
	width = 1000 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

function drawBarChart(data, xAttr, yAttr, elementId) {
	// Trying to make it its own separate module meant passing way too many vars

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
		.domain(data.map(function (d) { return d[xAttr]; }))
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
		.attr("fill", "#69b3a2")

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
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", function (d) { return x(d[xAttr]); })
		.attr("cy", function (d) { return y(d[yAttr]); })
		.attr("r", 1.5)
		.style("fill", "#69b3a2")
}