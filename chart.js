var margin = {
        top: 30,
        right: 30,
        bottom: 40,
        left: 50
    },
    width = 860 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

var rowConverter = function (d, i) {
    return {
        heartrate: +d.heartrate,
        sec: +d.sec,
        lower_norm: +d.lower_norm,
        higher_norm: +d.higher_norm
    };
};

var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style('background-color', 'black')
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("heartrate.csv", rowConverter)
    .then(function (data) {

        // X axis
        var x = d3.scaleLinear()
            .domain([0, 252])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr('color', '#ffffff')
            .call(d3.axisBottom(x));

        //Histogram
//        var histogram = d3.histogram()
//            .value(function (d) {
//                return d.heartrate;
//            }) // I need to give the vector of value
//            .domain(x.domain()) // then the domain of the graphic
//            .thresholds(x.ticks(10)); // then the numbers of bins
//
//        var bins = histogram(data);

        // Y axis
        var y = d3.scaleLinear()
            .domain([0, 120])
            .range([height, 0]);
        svg.append("g")
            .attr('color', '#ffffff')
            .call(d3.axisLeft(y))
            .attr('class', 'x-axis');

        // Add the lines

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#fffc92")
            .attr("stroke-width", 1)
            .attr("d", d3.line()
                .curve(d3.curveBasis)
                .x(function (d) {
                    return x(d.sec)
                })
                .y(function (d) {
                    return y(d.lower_norm)
                })
            )

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#fffc92")
            .attr("stroke-width", 1)
            .attr("d", d3.line()
                .curve(d3.curveBasis)
                .x(function (d) {
                    return x(d.sec)
                })
                .y(function (d) {
                    return y(d.higher_norm)
                })
            )
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#ffff00")
            .attr("stroke-width", 3)
            .attr("d", d3.line()
                .curve(d3.curveBasis)
                .x(function (d) {
                    return x(d.sec)
                })
                .y(function (d) {
                    return y(d.heartrate)
                })
            )

        svg.selectAll('line')
            .style('opacity', '0')

        svg.selectAll('.x-axis path.domain')
            .style('opacity', '0')

//        svg.selectAll("rect")
//            .data(bins)
//            .enter()
//            .append("rect")
//            .attr("x", 1)
//            .attr("transform", function (d) {
//                return "translate(" + x(d.x0) + "," + y(d.length) + ")";
//            })
//            .attr("width", function (d) {
//                return x(d.x1) - x(d.x0) - 1;
//            })
//            .attr("height", function (d) {
//                return height - y(d.length);
//            })
//            .style("fill", "#69b3a2")

        // Add the points
        //                svg.append("g")
        //                    .selectAll("dot")
        //                    .data(data)
        //                    .enter()
        //                    .append("circle")
        //                    .attr("cx", function (d) {
        //                        return x(d.sec)
        //                    })
        //                    .attr("cy", function (d) {
        //                        return y(d.heartrate)
        //                    })
        //                    .attr("r", 3)
        //                    .attr("fill", "#69b3a2")

        //        svg.selectAll("mybar")
        //            .data(data)
        //            .enter()
        //            .append("rect")
        //            .attr("x", function (d) {
        //                return x(d.sec);
        //            })
        //            .attr("y", function (d) {
        //                return y(d.heartrate);
        //            })
        //            .attr("width", x.bandwidth())
        //            .attr("height", function (d) {
        //                return height - y(d.heartrate);
        //            })
        //            .attr("fill", "#69b3a2")

    })


//https://bl.ocks.org/htakeuchi/a60c0ecb55713c06c054c26c6dbed57a
