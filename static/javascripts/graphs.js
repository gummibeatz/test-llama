var d3 = require('d3');

var margin = {top: 20, right: 50, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
  .range([0, width]);

var y = d3.scale.linear()
  .range([height, 0]);

  var color = d3.scale.category10();

  var axisNames = { 
    SD1: 'Semantic Dimension 1', 
    SD2: 'Semantic Dimension 2', 
    SD3: 'Semantic Dimension 3'
  };

  var xAxis = d3.svg.axis()
.scale(x)
  .orient("bottom");

  var yAxis = d3.svg.axis()
.scale(y)
  .orient("left");


  var svg = d3.select(".graph").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // add the tooltip area to the webpage
  var tooltip = d3.select(".graph").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

  d3.csv("static/csvs/combined-projections.csv", function(error,data){
    data.forEach(function(d){
      d.SD1 = +d.SD1;
      d.SD2 = +d.SD2;
      d.SD3 = +d.SD3;
      d.SD4 = +d.SD4;
    });

    var radius_scale = d3.scale.linear()
      .domain([0, d3.max(data,function(d){return d.SD3;})])
      .range([5, 20]);

    x.domain(d3.extent(data, function(d) { return d.SD1; })).nice();
    y.domain(d3.extent(data, function(d) { return d.SD2; })).nice();

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Semantic Dimension 1");

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Semantic Dimension 2")

      var circles = svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", function(d) {return radius_scale(d.SD3);})
      .attr("cx", function(d) { return x(d.SD1); })
      .attr("cy", function(d) { return y(d.SD2); })
      .style("fill", function(d) { return color(d.institute);})
      .on("mouseover", function(d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html(d.PI + " ("+d.institute+")")
          .style("left", (d3.event.pageX + 40) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
    .on("mouseout", function(d) {
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    })
    .on("click", function(d) {
      var dialogBox = new DialogBox(d);
      console.log((d.target));

    });

    var legend = svg.selectAll(".legend")
      .data(color.domain())
      .enter().append("g")
      .attr("class", "legend")
      .attr("width", 10)
      .attr("height", 10)
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });


    legend.append("rect")
      .attr("x", width - 18)
      .attr("y",height-105)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);


    legend.append("text")
      .attr("x", width - 24)
      .attr("y",height-100)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d,i) {return d;});

    d3.selectAll("[name=v]").on("change", function() {
      var selected = this.value;
      display = this.checked ? "inline" : "none";

      svg.selectAll(".dot")
        .filter(function(d) {return selected == d.institute;})
        .attr("display", display);
    });

    d3.selectAll("[name=sepal]").on("change", function(d) {
      radius = this.value;
      console.log(radius);
      svg.selectAll(".dot")
        circles.attr("r", function(d) {return radius_scale(d[radius]); });
    });



    d3.select("[name=xAX]").on("change", function(){
      xAxy = this.value;
      x.domain(d3.extent(data, function(d) { return d[xAxy]; })).nice();

      svg.select(".x.axis").transition().call(xAxis);

      svg.selectAll(".dot").transition().attr("cx", function(d) { 
        return x(d[xAxy]);
      });
      svg.selectAll(".x.axis").selectAll("text.label").text(axisNames[xAxy]);
    });

    d3.select("#radius_cutoff").on("input", function() {
      update(+this.value);
    });


    d3.select("[name=yAX]").on("change", function(){
      yAxy = this.value;
      y.domain(d3.extent(data, function(d) { return d[yAxy]; })).nice();
      svg.select(".y.axis").transition().call(yAxis);
      svg.selectAll(".dot").transition().attr("cy", function(d) { 
        return y(d[yAxy]);
      });
      svg.selectAll(".y.axis").selectAll("text.label").text(axisNames[yAxy]);
    });

    function update(nRadius) {

      // update the circle radius
      svg.selectAll(".dot")
        .filter(function(d){return radius_scale(d.SD3)<nRadius;})
        .attr("opacity",0.2);


      svg.selectAll(".dot")
        .filter(function(d){return radius_scale(d.SD3)>=nRadius;})
        .attr("opacity",1);
    }

  });
