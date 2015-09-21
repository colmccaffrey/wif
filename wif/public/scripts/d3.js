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
var margin = {top: 100, right: 100, bottom: 100, left: 100},
    width = 1260 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;
var padding = 100;
var tip = d3.tip()
  .attr('class', 'tip')
  .html(function(d) {
    return d.title + " " + d.year;
  })
  .offset([50, 0])
  //add css for tip - transition fade in and out
d3.json("full_bechdel.json", function(data){
  var yearBubbles = d3.select(".bubbles")
 	.append("svg")
 	//.attr('id', 'viz')
 	.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .call(tip);
 

  var movies = yearBubbles.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('class', 'hvr-hang');
		movies.attr('r', function(d, i) {
          return Math.abs(d.rating) / d.rating * 5})

		//*********random cy/cx *************
		// .attr('cx', function(d) {return Math.max(0 + padding, Math.random() * width - padding)})
		// .attr('cy', function(d) {return Math.max(0 + padding, Math.random() * height - padding)})
		
		//***********cy/cx by year************
		.attr('cx', function(d) {
			var max = 100
			var min = 0
			if(d.year < 1930){
				return Math.floor(Math.random() * (max - min + 1)) + min;	
			}else if (d.year < 1940){
				 min = max 
				max = max + 100
			 return Math.floor(Math.random() * (max - min + 1)) + min;	
			}else if(d.year < 1950){
				min = max +100
				max = max + 200
  		 return Math.floor(Math.random() * (max - min + 1)) + min;	
			} else if(d.year < 1960){
				min = max  + 200
				max = max + 300
  		 return Math.floor(Math.random() * (max - min + 1)) + min;
			} else if(d.year < 1970){
				min = max + 300
				max = max + 400
  		 return Math.floor(Math.random() * (max - min + 1)) + min;
			} else if(d.year < 1980){
				min = max +400
				max = max + 500
  		 return Math.floor(Math.random() * (max - min + 1)) + min;		
			} else if(d.year < 1990){
				min = max +500
				max = max + 600
  		 return Math.floor(Math.random() * (max - min + 1)) + min;			
			} else if(d.year < 2000){
				min = max +600
				max = max + 700
  		 return Math.floor(Math.random() * (max - min + 1)) + min;			

			} else if(d.year < 2010){
				min = max +700
				max = max + 800
  		 return Math.floor(Math.random() * (max - min + 1)) + min;	
  		 } else if(d.year <= 2015){
				min = max +800
				max = max + 900
  		 return Math.floor(Math.random() * (max - min + 1)) + min;			
			}
			})


		.attr('cy', function(d) {
			max = 800
			min= 720
			if(d.year < 1930){
  		 return Math.floor(Math.random() * (max - min + 1)) + min;
			}
			else if(d.year < 1940){
				min = min - 80
  		 return Math.floor(Math.random() * (max - min + 1)) + min;

			} else if(d.year < 1950){
				min = min - 160
  		 return Math.floor(Math.random() * (max - min + 1)) + min;

			} else if(d.year < 1960){
				min = min - 240
  		 return Math.floor(Math.random() * (max - min + 1)) + min;

			} else if(d.year < 1970){
				min = min - 320
  		 return Math.floor(Math.random() * (max - min + 1)) + min;

			} else if(d.year < 1980){
				min = min - 400
  		 return Math.floor(Math.random() * (max - min + 1)) + min;

			} else if(d.year < 1990){
				min = min - 480
  		 return Math.floor(Math.random() * (max - min + 1)) + min;

			} else if(d.year < 2000){
				min = min - 560
  		 return Math.floor(Math.random() * (max - min + 1)) + min;


			} else if(d.year < 2010){
				min = min - 640
  		 return Math.floor(Math.random() * (max - min + 1)) + min;

			} else if(d.year <= 2015){
				min = min - 720
  		 return Math.floor(Math.random() * (max - min + 1)) + min;
  		}
			})

		.style('opacity', 0.8)
		.style('fill', function(d){
			if(d.rating === "3"){
				return "steelblue"
			}
			else if(d.rating === "2"){
				return "gold"
			}
			else if(d.rating === "1"){
				return "orange"
			}
			else if(d.rating ==="0"){
					return "red"
			}
		})
		.on('mousedown', tip.show)
		.on('mouseover', expandOut)
		.on('mouseout', shrinkIn)


function expandOut(){
    //d3.select(this)
    d3.select(this.parentNode.appendChild(this))

      .transition()            
        .delay(0)            
        .duration(100)
  		  .style("stroke", "white")
        .attr('r', function(d){
        	if(d.rating === '3'){
        		return 30;
        	}
        	else if(d.rating ==="2"){
        		return 45;
        	}
        	else if(d.rating === "1"){
        		return 50;
        	}

        });
};

function shrinkIn(){
    d3.select(this)
      .transition()
      .delay(100)
      .duration(1000)
      .each("end", tip.hide) //work on getting longer delay for tip.hide- find way to bring to front
      //.style('pointer-events', 'none')

      .attr('r', function(d, i) {
          return Math.abs(d.rating) / d.rating * 5;
        });
		};
});

// d3.json("full_bechdel.json", function(data){
//   var linksChart = d3.select(".links")
//  	.append("svg")


// d3.json("full_bechdel.json", function(data){
//   var yearBubbles = d3.select(".bubbles")
//  	.append("svg")
var widthLinks = 960,
    heightLinks = 500;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([widthLinks, heightLinks]);

var linksChart = d3.select(".links").append("svg")
    .attr("width", widthLinks)
    .attr("height", heightLinks);

d3.json("test.json", function(error, graph) {
  if (error) throw error;

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = linksChart.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = linksChart.selectAll(".node")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("fill", function(d) { return color(d.group); })
      .call(force.drag);

  node.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
});

