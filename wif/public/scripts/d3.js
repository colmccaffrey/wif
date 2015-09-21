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
  var svg = d3.select("body")
 	.append("svg")
 	//.attr('id', 'viz')
 	.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .call(tip);
 

  movies = svg.selectAll('circle')
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


