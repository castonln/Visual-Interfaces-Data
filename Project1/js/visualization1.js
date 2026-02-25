d3.csv('data/combined_data.csv')
	.then(data => {
		console.log('Data loading complete. Work with dataset.');

		// //DATA PROCESSING
		data.forEach(d => {
			d["People who report having friends or relatives they can count on"] = parseFloat(d["People who report having friends or relatives they can count on"])
			d["Share of the population using the Internet"] = parseFloat(d["Share of the population using the Internet"])
		});

		console.log(data)

		drawBarChart(
			data,
			"Entity",
			"People who report having friends or relatives they can count on",
			"#friends-or-relatives-bar-chart"
		);

	})
	.catch(error => {
		console.error('Error loading the data for friends / relatives ' + error);
	});

function drawBarChart(data, domainAttr, valueAttr, elementId) {
	// Trying to make it its own separate module meant passing way too many vars

	data.sort(function (b, a) {
		return a[valueAttr] - b[valueAttr];
	});

	const svg = d3.select(elementId)
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`);

	// X axis
	var x = d3.scaleBand()
		.range([0, width])
		.domain(data.map(function (d) { return d[domainAttr]; }))
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
		.attr("x", function (d) { return x(d[domainAttr]); })
		.attr("y", function (d) { return y(d[valueAttr]); })
		.attr("width", x.bandwidth())
		.attr("height", function (d) { return height - y(d[valueAttr]); })
		.attr("fill", "#69b3a2")

}