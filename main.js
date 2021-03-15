
var weatherList = [
{"name": "January", "high": 37, "low": 22, "rain": 8},
{"name": "February", "high": 39, "low": 24, "rain": 7},
{"name": "March", "high": 46, "low": 31, "rain": 8},
{"name": "April", "high": 57, "low": 41, "rain": 8},
{"name": "May", "high": 67, "low": 50, "rain": 8},
{"name": "June", "high": 77, "low": 59, "rain": 8},
{"name": "July", "high": 82, "low": 66, "rain": 6},
{"name": "August", "high": 81, "low": 65, "rain": 7},
{"name": "September", "high": 73, "low": 58, "rain": 6},
{"name": "October", "high": 62, "low": 47, "rain": 7},
{"name": "November", "high": 52, "low": 38, "rain": 8},
{"name": "December", "high": 42, "low": 28,"rain": 9}
];

var width  = window.innerWidth;
var height = window.innerHeight;

var svg = d3.select("body")
.append("svg")
.attr("width", width - 5)
.attr("height", height - 5);

var widthScale = d3.scaleLinear().domain([0,11]).range([100, width - 100])
var heightScale = d3.scaleLinear().domain([29.5, 74]).range([height - 100, 100])
var backgroundScale = d3.scaleLinear().domain([22,82]).interpolate(d3.interpolateCubehelix).range([d3.rgb("#bdfffe"), d3.rgb('#fbffbd')])

var newGradient = function(index) {
	var weatherObject = weatherList[index]
	svg.selectAll("linearGradient").remove()
	var defs = svg.append("defs");
	var linearGradient = defs.append("linearGradient").attr("id", "linear-gradient");
	linearGradient
		.attr("x1", "0%")
		.attr("y1", "0%")
    	.attr("x2", "0%")
    	.attr("y2", "100%");

	linearGradient.append("stop")
    	.attr("offset", "0%")
    	.attr("stop-color", backgroundScale(weatherObject.high));

//Set the color for the end (100%)
	linearGradient.append("stop")
    	.attr("offset", "100%")
    	.attr("stop-color", backgroundScale(weatherObject.low));
}


var background = svg.append("rect")
.attr("x", 0)
.attr("y", 0)
.attr("width", width)
.attr("height", height)
.attr("fill","white")

var handleMouseOver = function(d) {
	newGradient(this.id)
	background.attr("fill","url(#linear-gradient)")
	d3.select(this).attr("stroke-width", 2)
}

var handleMouseOut = function(d) {
	d3.select(this).attr("stroke-width", 0)
}

svg.selectAll("dot")
	.data(weatherList)
    .enter()
    .append("circle")
    .attr("cy", (d) => heightScale((d.low + d.high) / 2))
    .attr("cx", (d,i) => widthScale(i))
    .attr("r", 10)
    .attr("id",(d,i) => i)
    .attr("fill", "#a75cb8")
    .attr("stroke", "black")
    .attr("stroke-width", 0)
	.on("mouseover", handleMouseOver)
	.on("mouseout", handleMouseOut)

for(var i = 0; i < weatherList.length - 1; i++){
	var curr = weatherList[i]
	var next = weatherList[i+1]
	svg.append("line")
	.attr("x1", widthScale(i))
	.attr("y1", heightScale((curr.low + curr.high) / 2))
	.attr("x2", widthScale(i + 1))
	.attr("y2", heightScale((next.low + next.high) / 2))
	.attr("stroke", "##774982")
}


