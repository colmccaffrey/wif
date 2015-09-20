console.log("linked");
var data = [4, 8, 15, 16, 23, 42];

d3.select("body")
    .style("color", "black")
    .style("background-color", "white");

    d3.selectAll("section")
    .attr("class", "special")
  .append("div")
    .html("<h1>Hello, world!</h1>");

    var section = d3.selectAll("section");

section.append("div")
    .html("First!");

section.append("div")
    .html("Second.");

var x = d3.scale.linear()
.domain([0, d3.max(data)])
.range([0, 420]);

var chart = d3.select(".chart");
var bar = chart.selectAll("div");
var barUpdate = bar.data(data);
var barEnter = barUpdate.enter().append("div");
barEnter.style("width", function(d) { return x(d) + "px"; });

barEnter.text(function(d) { return d; });



//********************
var margin = {top: 10, right: 5, bottom: 8, left: 10},

    width = 1260 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
var padding = 70;
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .html(function(d) {
    return d.title + " " + d.year;
  })
  .offset([-5, 0])
  //add css for tip - transition fade in and out
d3.json("full_bechdel.json", function(data){
  var svg = d3.select("body")
 	.append("svg")
 	.attr('id', 'viz')
 	.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .call(tip);
 
  curses = svg.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('class', 'hvr-hang');
		curses.attr('r', function(d, i) {
          return Math.abs(d.rating) / d.rating * 10})
		.attr('cx', function(d) {return Math.max(0 + padding, Math.random() * width - padding)})
		.attr('cy', function(d) {return Math.max(0 + padding, Math.random() * height - padding)})
	
		.style('opacity', 0.8)
		.style('fill', function(d){
			if(d.dubious !== '0'){
				return "#cdcdcd"
			}
			else if(d.rating === "3"){
				return "steelblue"
			}
			else if(d.rating === "2"){
				return "orange"
			}
			else if(d.rating === "1"){
				return "red"
			}
			else if(d.rating ==="0"){
					return "black"
			}
		})
		.on('mouseover', tip.show)
    .on('mouseout', tip.hide)
})

