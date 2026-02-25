// Shared margins
const margin = { top: 30, right: 30, bottom: 70, left: 60 };

Promise.all([
    d3.csv('data/combined-data-2016.csv'),
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
])
    .then(loadData => {
        const data = loadData[0];
        const topo = loadData[1];

        // Parse numeric fields
        data.forEach(d => {
            d["People who report having friends or relatives they can count on (%)"] =
                parseFloat(d["People who report having friends or relatives they can count on (%)"]);

            d["Share of the population using the Internet (%)"] =
                parseFloat(d["Share of the population using the Internet (%)"]);

            d["Self-reported life satisfaction average (0-10)"] =
                parseFloat(d["Self-reported life satisfaction average (0-10)"]);
        });

        // Draw all charts
        drawBarChart(
            data,
            "Entity",
            "People who report having friends or relatives they can count on (%)",
            "#friends-or-relatives-bar-chart"
        );

        drawBarChart(
            data,
            "Entity",
            "Share of the population using the Internet (%)",
            "#using-the-internet-bar-chart"
        );

        drawScatterPlot(
            data,
            "Share of the population using the Internet (%)",
            "People who report having friends or relatives they can count on (%)",
            "#scatterplot-1"
        );

        drawChoroplethMap(
            data,
            "Code",
            "People who report having friends or relatives they can count on (%)",
            topo,
            [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            d3.schemeBlues[9],
            "#friends-or-relatives-graph"
        );

        drawChoroplethMap(
            data,
            "Code",
            "Share of the population using the Internet (%)",
            topo,
            [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            d3.schemeBlues[9],
            "#using-the-internet-graph"
        );

        drawBarChart(
            data,
            "Entity",
            "Self-reported life satisfaction average (0-10)",
            "#life-satisfaction-bar-chart"
        );

        drawChoroplethMap(
            data,
            "Code",
            "Self-reported life satisfaction average (0-10)",
            topo,
            [0,1,2,3,4,5,6,7,8,9,10],
            d3.schemeBlues[9],
            "#life-satisfaction-map"
        );

		drawScatterPlot(
			data,
			"Share of the population using the Internet (%)",
			"Self-reported life satisfaction average (0-10)",
			"#scatterplot-2"
		)

        document.getElementById("toggle-friends").addEventListener("click", () => {
            document.getElementById("friends-container").style.display = "block";
            document.getElementById("life-container").style.display = "none";
        });

        document.getElementById("toggle-life").addEventListener("click", () => {
            document.getElementById("friends-container").style.display = "none";
            document.getElementById("life-container").style.display = "block";
        });
    });

function drawBarChart(loadData, xAttr, yAttr, elementId) {

    // Filter + sort
    const data = loadData
        .filter(d => !isNaN(d[yAttr]))
        .sort((b, a) => a[yAttr] - b[yAttr]);

    // Read SVG size from HTML
    const svg = d3.select(elementId);
    const svgWidth = +svg.attr("width");
    const svgHeight = +svg.attr("height");

    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // X scale
    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d[xAttr]))
        .padding(0.2);

    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Y scale
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[yAttr])])
        .range([height, 0]);

    g.append("g").call(d3.axisLeft(y));

    // X axis label
    g.append("text")
        .attr("class", "axis-label")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .style("text-anchor", "middle")
        .text(xAttr);

    // Y axis label
    g.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 15)
        .style("text-anchor", "middle")
        .text(yAttr);

    // Bars
    g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d[xAttr]))
        .attr("y", d => y(d[yAttr]))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d[yAttr]))
        .attr("fill", d3.schemeBlues[6][4]);
}

function drawScatterPlot(data, xAttr, yAttr, elementId) {

    const svg = d3.select(elementId);
    const svgWidth = +svg.attr("width");
    const svgHeight = +svg.attr("height");

    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width]);

    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

    g.append("g").call(d3.axisLeft(y));

    // X axis label
    g.append("text")
        .attr("class", "axis-label")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .style("text-anchor", "middle")
        .text(xAttr);

    // Y axis label
    g.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 15)
        .style("text-anchor", "middle")
        .text(yAttr);

    g.selectAll("circle")
        .data(data.filter(d => !isNaN(d[yAttr])))
        .enter()
        .append("circle")
        .attr("cx", d => x(d[xAttr]))
        .attr("cy", d => y(d[yAttr]))
        .attr("r", 2)
        .style("fill", d3.schemeBlues[6][5]);
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