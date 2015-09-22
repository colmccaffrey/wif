console.log("linked");
var years = [1940,  1960, 1980, 2000, 2015];

var margin = {top: 100, right: 100, bottom: 100, left: 100},
    width = 1260 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;
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
		.attr('cx', function(d) {
      return Math.floor(Math.random() * 1120)
    })
     .attr('cy', function(d) {
      return Math.floor(Math.random() * 600)
    })
		
    .style("stroke", "white")
		.style('opacity', 0.8)
		.style('fill', function(d){
     if(d.dubious != '0'){
            return "#cdcdcd"
     }else if(d.rating === "3"){
				return "steelblue"
			}
			else if(d.rating === "2"){
				return "gold"
			}
			else if(d.rating <= "1"){
				return "orange"

      }
		})
		.on('mousedown', tip.show)
		.on('mouseover', expandOut)
		.on('mouseout', shrinkIn)

  d3.select("#seeAll").on("click", function(){
      yearBubbles.selectAll('circle')
      .data(data)
    .enter()
    .append('circle')
    .attr('class', 'hvr-hang');
    movies.attr('r', function(d, i) {
      return Math.abs(d.rating) / d.rating * 6})
    .transition()
    .delay(10)
    .duration(1000)

     .attr('cx', function(d) {
      return Math.floor(Math.random() * 1120)
    })
     .attr('cy', function(d) {
      return Math.floor(Math.random() * 600)
    })
});

d3.select("#yearSort").on("click", function(d){
   yearBubbles.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'hvr-hang');
    movies.attr('r', function(d, i) {
      return Math.abs(d.rating) / d.rating * 5})
    .transition()
    .delay(50)
    .duration(1200)
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
        max = max + 850
       return Math.floor(Math.random() * (max - min + 1)) + min;  
       } else if(d.year <= 2015){
        min = max +850
        max = max + 1000
       return Math.floor(Math.random() * (max - min + 1)) + min;      
      }
      })


    .attr('cy', function(d) {
      max = 600
      min= 520
      if(d.year < 1930){
       return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      else if(d.year < 1940){
        min = min - 60
       return Math.floor(Math.random() * (max - min + 1)) + min;

      } else if(d.year < 1950){
        min = min - 120
       return Math.floor(Math.random() * (max - min + 1)) + min;

      } else if(d.year < 1960){
        min = min - 180
       return Math.floor(Math.random() * (max - min + 1)) + min;

      } else if(d.year < 1970){
        min = min - 240
       return Math.floor(Math.random() * (max - min + 1)) + min;

      } else if(d.year < 1980){
        min = min - 300
       return Math.floor(Math.random() * (max - min + 1)) + min;

      } else if(d.year < 1990){
        min = min - 360
       return Math.floor(Math.random() * (max - min + 1)) + min;

      } else if(d.year < 2000){
        min = min - 420
       return Math.floor(Math.random() * (max - min + 1)) + min;


      } else if(d.year < 2010){
        min = min - 480
       return Math.floor(Math.random() * (max - min + 1)) + min;

      } else if(d.year <= 2015){
        min = min - 560
       return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      })
    showTimeline();

});

function showTimeline(){
   var axis = d3.select("ul").selectAll("li")
    .data(years)
    .enter()
    .append("li")
    .text(function(d){
      return d
    })
  };

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


//****************

var widthLinks = 600,
 heightLinks = 400;

//Set up the colour scale
var color = d3.scale.category20();

//Set up the force layout
var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([widthLinks, heightLinks]);

//Append a SVG to the body of the html page. Assign this SVG as an object to svg
var chartLinks = d3.select(".links").append("svg")
    .attr("width", widthLinks)
    .attr("height", heightLinks);

//Read the data from the mis element 

d3.json("test.json", function(error, graph) {
  if (error) throw error;

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();
// var mis = document.getElementById('mis').innerHTML;
// graph = JSON.parse(mis);

//Creates the graph data structure out of the json data


//Create all the line svgs but without locations yet
var link = chartLinks.selectAll(".link")
    .data(graph.links)
    .enter().append("line")
    .attr("class", "link")
    .style("stroke-width", function (d) {
    return Math.sqrt(d.value);
    });

//Do the same with the circles for the nodes - no 
var node = chartLinks.selectAll(".node")
    .data(graph.nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", 10)
    .style("fill", function (d) {
      if(d.group === "3"){
        return "steelblue"
      }
      else if(d.group === "2"){
        return "gold"
      }
      else if(d.group <= "1"){
        return "orange"
      }
    
    })
    .call(force.drag);


//Now we are giving the SVGs co-ordinates - the force layout is generating the co-ordinates which this code is using to update the attributes of the SVG elements
force.on("tick", function () {
    link.attr("x1", function (d) {
        return d.source.x;
    })
        .attr("y1", function (d) {
        return d.source.y;
    })
        .attr("x2", function (d) {
        return d.target.x;
    })
        .attr("y2", function (d) {
        return d.target.y;
    });

    node.attr("cx", function (d) {
        return d.x;
    })
        .attr("cy", function (d) {
        return d.y;
    });
      });



var optArray = [];
for (var i = 0; i < graph.nodes.length - 1; i++) {
    optArray.push(graph.nodes[i].name);
}

optArray = optArray.sort();

$(function () {
    $("#search").autocomplete({
        source: optArray
    });
});
});

function searchNode() {

    //find the node

    var selectedVal = document.getElementById('search').value;
    var node = chartLinks.selectAll(".node");

    if (selectedVal == "none") {
        node.style("stroke", "white").style("stroke-width", "1");
    } else {
        var selected = node.filter(function (d, i) {
            return d.name != selectedVal;
        });
        selected.style("opacity", "0");
        var link = chartLinks.selectAll(".link")
        link.style("opacity", "0");
        d3.selectAll(".node, .link").transition()
            .duration(8000)
            .style("opacity", 1);


    }

}


