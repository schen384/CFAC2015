


var highlightCountries = [ {"canada" : 124},
							{"usa" : 840}
							
]

// North America
const USA = 840,
	CANADA = 124;


// South America
const PERU = 604,
	ECUADOR = 218,
	BELIZE = 84,
	JAMAICA = 388,
	PUERTO_RICO = 630;

// Europe
const ITALY = 380,
	SPAIN = 724,
	FRANCE = 250,
	GERMANY = 276,
	UK = 826,
	MONACO = 492,
	SLOVENIA = 705;

// Africa
const SOUTH_AFRICA = 710,
	MALAWI = 454,
	UGANDA = 800,
	KENYA = 404;

// ASIA
const AUSTRALIA = 36,
	INDIA = 356,
	MALAYSIA = 458,
	MONGOLIA = 496;

var northAmerica = [USA, CANADA],
	southAmerica = [PERU, ECUADOR, BELIZE, JAMAICA, PUERTO_RICO],
	europe = [ITALY, SPAIN, FRANCE, GERMANY, UK, MONACO, SLOVENIA],
	africa = [SOUTH_AFRICA, MALAWI, UGANDA, KENYA],
	asia = [AUSTRALIA, INDIA, MALAYSIA, MONGOLIA];


$( document ).ready(function() {
	console.log("in ready");
    drawMap();
});

$( window ).resize(function() {
	console.log("in ready");

	$("#map").empty();
    drawMap();


});

function drawMap() {

console.log("in draw map");
	var mapRatio = 0.5;


	var width = 1000,
	    height = 900;

	var container = document.getElementById("map-container");
	if (container) {
		height = container.clientWidth / 1.8;
		width = container.clientWidth;
	}

	var sideCol = document.getElementById("map-side-col");
	sideCol.style.height = height+"px";


	console.log("width = "+width);

	var projection = d3.geo.cylindricalStereographic()
	    .parallel(45)
	    .scale((width/550)*100)
	    .translate([width / 2, height / 2])
	    .precision(.1);

	var path = d3.geo.path()
	    .projection(projection);

	var graticule = d3.geo.graticule();

	var svg = d3.select("#map")
	    .attr("width", width)
	    .attr("height", height);

	svg.append("path")
	    .datum(graticule)
	    .attr("class", "graticule")
	    .attr("d", path);



	d3.json("../json/world.json", function(error, world) {
	  	if (error) throw error;

		var geometries = world.objects.countries.geometries;

		for (var i = 0; i < geometries.length; i++) {
			if (geometries[i].id == 10) {
				delete geometries[i];
			}
		};

		world.objects.countries.geometries = geometries;

		var countries = topojson.feature(world, world.objects.countries).features,
		  neighbors = topojson.neighbors(world.objects.countries.geometries);
		svg.selectAll(".country")
		  .data(countries)
		.enter().insert("path", ".graticule")
		  .attr("class", "country-no-fill")

		  .attr("d", path)
		  .attr("id", function(d) { if(d) {return "country" + d.id;} })
		  .attr("class", function(d) { 
		  				
		  					var className = "country-no-fill ";
		  					if (d) {
			  					if(northAmerica.indexOf(d.id) != -1) {
			  						className += "continent-northamerica";
			  					} else if (southAmerica.indexOf(d.id) != -1) {
			  						className += "continent-southamerica";
			  					} else if (europe.indexOf(d.id) != -1) {
			  						className += "continent-europe";
			  					} else if (africa.indexOf(d.id) != -1) {
			  						className += "continent-africa";
			  					} else if (asia.indexOf(d.id) != -1) {
			  						className += "continent-asia";
			  					}
			  				}
			  				return className;

						})


		svg.insert("path", ".graticule")
		  .datum(topojson.feature(world, world.objects.land))
		  .attr("class", "land")
		  
		  .attr("d", path)
		  .attr("class", "country-land");

		svg.insert("path", ".graticule")
		  .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))

		  .attr("class", "boundary")
		  .attr("d", path)
		  .attr("class", "country-outline");

		attachListeners();



	});

}

function attachListeners() {

	$('.country-no-fill').hover(function() {
	    var theClass = $(this).attr('class');
	    
	    var className = theClass.replace('country-no-fill ','');

	    $('.country-no-fill:not(.' + className + ')').animate({'opacity': 0.2}, 150);

	    var continent = className.replace('continent-','');
	    console.log("continent = "+continent);
	    var continentName = '';
	    var continentDescription = '';
	    var textColor = "rgba(0,0,0,0)";
		switch(continent) {
		    case "northamerica":
		        continentName = "North America";
		        continentDescription = "From studying climate change at the Arctic's edge to tracking the health of dolphins and whales off the coast of Southern California, Earthwatch's North American expeditions offer you the chance to contribute to critical research that addresses key environmental challenges.";
		        textColor = "#06966f";
		        break;
		    case "southamerica":
		        continentName = "South America";
		        continentDescription = "From studying climate change at the Arctic's edge to tracking the health of dolphins and whales off the coast of Southern California, Earthwatch's North American expeditions offer you the chance to contribute to critical research that addresses key environmental challenges.";
		        textColor = "#e25929";
		        break;
		    case "europe":
		        continentName = "Europe";
		        continentDescription = "From studying climate change at the Arctic's edge to tracking the health of dolphins and whales off the coast of Southern California, Earthwatch's North American expeditions offer you the chance to contribute to critical research that addresses key environmental challenges.";
		        textColor = "#31b0c9";
		        break;
		    case "africa":
		        continentName = "Africa";
		        continentDescription = "From studying climate change at the Arctic's edge to tracking the health of dolphins and whales off the coast of Southern California, Earthwatch's North American expeditions offer you the chance to contribute to critical research that addresses key environmental challenges.";
		        textColor = "#dcb312";
		        break;
		    case "asia":
		    	continentName = "Asia";
		    	continentDescription = "From studying climate change at the Arctic's edge to tracking the health of dolphins and whales off the coast of Southern California, Earthwatch's North American expeditions offer you the chance to contribute to critical research that addresses key environmental challenges.";
		    	textColor = "#1675a9";
		        break;
	
		}
		$("#map-continent-name").html(continentName);
		$("#map-continent-description").html(continentDescription);
		$("#map-continent-name").css("color",textColor);

	    $('#map-continent-name').animate({'opacity': 1}, 150);
	    $('#map-continent-description').animate({'opacity': 1}, 150);


	}, function() {
	    $('.country-no-fill').animate({'opacity': 1}, 150); //restore all .country-no-fills to 100% opacity
	    $('#map-continent-name').animate({'opacity': 0}, 150);
	    $('#map-continent-description').animate({'opacity': 0}, 150);
	    var continentName = '';
	    var continentDescription = '';
	    var textColor = "rgba(0,0,0,0)";
		$("#map-continent-name").html(continentName);
		$("#map-continent-description").html(continentDescription);
		$("#map-continent-name").css("color",textColor);

	});

}

