

var earthwatch = new earthwatchObject;

$(document).ready(function() {
    earthwatch.setup();
});

$(window).resize(function() {
	earthwatch.resize();



});

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


const INTRO_IMG_HEIGHT = 484;
const INTRO_IMG_WIDTH = 1000;

const CONNECT_ROW_ID = "connect-row";
const EW_CONTENT_ID = "ew-content";

const CONTINENT_PAGE = false;

const CURRENT_MAP = "../json/world.json";

var northAmerica = [USA, CANADA];
var southAmerica = [PERU, ECUADOR, BELIZE, JAMAICA, PUERTO_RICO];
var europe = [ITALY, SPAIN, FRANCE, GERMANY, UK, MONACO, SLOVENIA];
var africa = [SOUTH_AFRICA, MALAWI, UGANDA, KENYA];
var asia = [AUSTRALIA, INDIA, MALAYSIA, MONGOLIA];

function earthwatchObject() {
    


    this.setup = function() {


		this.loadSections();
		this.attachListeners();
		//this.drawMap();
    	
    }

    this.resize = function() {
		$("#map").empty();
		this.setup();
    	
    }

    this.loadSections = function () {
    	console.log("in load sections");
    	// load connect section
    	jQuery("#"+CONNECT_ROW_ID).load("../html/connect.html");

    	// load continent page 
    	var that = this;
    	if (CONTINENT_PAGE) {
    		$("#"+EW_CONTENT_ID).html("");
    		$("#"+EW_CONTENT_ID).load("../html/continent.html", function() {
    			that.afterLoad();
    		});
    	} else {
    		this.afterLoad();
    	}

    }

    this.afterLoad = function () {
		this.drawMap();
		this.parallax();
		this.setIntroImage();
    }

    this.parallax = function () {
		$(window).stellar({
			 horizontalOffset: 50,
			 verticalOffset: 105
		});
    }


    this.attachListeners = function() {
		    	
		$('a').click(function(){

			var scroll = $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top - 50;
			console.log(scroll);
		    $('html, body').animate({
		        scrollTop: scroll
		    }, 500);
		    return false;
		});

    }


	this.setIntroImage = function() {
		var ratio = (INTRO_IMG_WIDTH/INTRO_IMG_HEIGHT);

		var w = $(window).width();
		var h = $(window).height();


		var docRatio = w/h;
		var size = "auto 110%"; //sizing for ratio < 1
		if (ratio < docRatio) {
			size = "100% auto";
		}

		$("#ew-intro").css("background-size", size);
		
	}

    this.drawMap = function(mapJSON) {


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
		console.log("height = "+height);

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

		d3.json(CURRENT_MAP, function(error, world) {
			console.log("in d3 step 1");
		  	if (error) throw error;
		  	console.log("in d3 step 2");
		  	if (CURRENT_MAP != "../json/world.json") {
		  		//var geometries = world.objects.collection.geometries;
		  		var countries = topojson.feature(world, world.objects.collection).features,
			  		neighbors = topojson.neighbors(world.objects.collection.geometries);
		  	} else {
		  		//var geometries = world.objects.countries.geometries;
				var countries = topojson.feature(world, world.objects.countries).features,
				  neighbors = topojson.neighbors(world.objects.countries.geometries);
		  	}
			
			console.log(countries);
			// for (var i = 0; i < geometries.length; i++) {
			// 	if (geometries[i].id == 10) {
			// 		delete geometries[i];
			// 	}
			// };

			// world.objects.countries.geometries = geometries;




// WORLD MAP
			svg.selectAll(".country")
			  .data(countries)
			.enter().insert("path", ".graticule")
			  .attr("class", "country-no-fill")

			  .attr("d", path)
			  .attr("id", function(d) { if(d) {return "country" + d.id;} })
			  .attr("class", function(d) { 
			  				
			  					var className = "country-no-fill ";
			  					if (d) {
				  					if (northAmerica.indexOf(d.id) != -1) {
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
			  console.log('STEP 1');

			svg.insert("path", ".graticule")
			  .datum(topojson.feature(world, world.objects.land))
			  .attr("class", "land")
			  
			  .attr("d", path)
			  .attr("class", "country-land continent");


console.log('STEP 2');
			svg.insert("path", ".graticule")
			  .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
			  .attr("class", "boundary")
			  .attr("d", path)
			  .attr("class", "country-outline");

console.log('STEP 3');




		});
		this.mapListeners();

	}



	this.mapListeners = function() {
		console.log("Map listener");
		$('.country-no-fill').hover(function() {
		    
		    var className = $(this).attr('class').replace('country-no-fill ',''),
		    	continent = className.replace('continent-','');

		    var continentName = '',
		    	continentDescription = '',
		    	textColor = "rgba(0,0,0,0)";

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

			$('.country-no-fill:not(.' + className + ')').animate({'opacity': 0.2}, 150);
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




};

