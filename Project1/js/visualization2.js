d3.csv('data/share-of-individuals-using-the-internet-2016.csv')
    .then(data => {
        console.log('Data loading complete. Work with dataset.');

        // //DATA PROCESSING
        data.forEach(d => {
            d["Share of the population using the Internet"] = parseFloat(d["Share of the population using the Internet"])
            d.Year = parseInt(d.Year)
        });

        drawBarChartHorizontal(
            data,
            "Entity",
            "Share of the population using the Internet",
        );

    })
    .catch(error => {
        console.error('Error loading the data for friends / relatives ' + error);
    });

function drawBarChartHorizontal(data, domainAttr, valueAttr) {
    // Trying to make it its own separate module meant passing way too many vars
    // Plus we flip horizontal here to add space

    data.sort(function (b, a) {
        return a[valueAttr] - b[valueAttr];
    });

    const svg = d3.select('body').append('svg')
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
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Y axis
    var y = d3.scaleBand()
        .range([0, height])
        .domain(data.map(function (d) { return d[domainAttr]; }))
        .padding(.1);
    svg.append("g")
        .call(d3.axisLeft(y))

    //Bars
    svg.selectAll("myRect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", x(0))
        .attr("y", function (d) { return y(d[domainAttr]); })
        .attr("width", function (d) { return x(d[valueAttr]); })
        .attr("height", y.bandwidth())
        .attr("fill", "#69b3a2")

}