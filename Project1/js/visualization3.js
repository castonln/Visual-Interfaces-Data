d3.csv('data/combined_data.csv')
    .then(data => {
        console.log('Data loading complete. Work with dataset.');

        // //DATA PROCESSING
        data.forEach(d => {
            d["Share of the population using the Internet"] = parseFloat(d["Share of the population using the Internet"])
            d["People who report having friends or relatives they can count on"] = parseFloat(d["People who report having friends or relatives they can count on"])
            d.Year = parseInt(d.Year)
        });

        drawScatterPlot(
            data,
            "People who report having friends or relatives they can count on",
            "Share of the population using the Internet",
        );

    })
    .catch(error => {
        console.error('Error loading the data for friends / relatives ' + error);
    });

function drawScatterPlot(data, domainAttr, valueAttr) {
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
        .attr("cx", function (d) { return x(d[domainAttr]); })
        .attr("cy", function (d) { return y(d[valueAttr]); })
        .attr("r", 1.5)
        .style("fill", "#69b3a2")

}