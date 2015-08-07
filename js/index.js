

var earthwatch = new earthwatchObject;

$(document).ready(function() {
    earthwatch.setup();
    //if on continent page
    var continent = earthwatch.getUrlParameter('continent');
    if (continent != null) {
      earthwatch.loadContinent(continent);
    }
});

$(window).resize(function() {
	earthwatch.resize();



});

// North America
const AMERICA = 840,
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

const CONTINENT_PAGE = true;

const CURRENT_MAP = "../json/world.json";

var northAmerica = [AMERICA, CANADA];
var southAmerica = [PERU, ECUADOR, BELIZE, JAMAICA, PUERTO_RICO];
var europe = [ITALY, SPAIN, FRANCE, GERMANY, UK, MONACO, SLOVENIA];
var africa = [SOUTH_AFRICA, MALAWI, UGANDA, KENYA];
var asia = [AUSTRALIA, INDIA, MALAYSIA, MONGOLIA];

function earthwatchObject() {
    this.continent,
    this.activityLevel,
    this.researchType;
    var exp_continent,exp_type,all_exp;


    this.setup = function() {
		//this.loadSections();
		this.parallax();
		this.attachListeners();
		this.setIntroImage();
		 if ($(".expedition-card").length > 1) {
			$("#expedition-cards").mCustomScrollbar({
				axis:"y",
				scrollbarPosition: "outside",
        advanced:{
          updateOnContentResize: true
        }
			});
		}

		//this.drawMap();
		this.loadMap();
		this.mapListeners();

    }

    this.resize = function() {
		$("#map").empty();
		//this.drawMap();
		this.setIntroImage();

    }

    this.test = function() {
      console.log(exp_continent);
    }

    this.loadContinent = function(continent) {
      $.getJSON('../json/expeditions.json', function(data) {
        var cards = $("#expedition-cards");
        $("#continent-wel").html('Welcome to ' + continent + '!');
        $("#continent-nav").html(continent);
        exp_continent = data[continent];
        all_exp = [];
        for (var key in exp_continent) {
          for (var j = 0;j < exp_continent[key].length;j++) {
            all_exp.push(exp_continent[key][j]);
          }
        }
        if (all_exp.length) {
          for (var i = 0; i < all_exp.length; i++) {
            var temp = $("#card-template").html();
            var html = Mustache.render(temp,all_exp[i]);
            cards.append(html);
          }
        }
        if ($(".expedition-card").length > 0) {
          $("#expedition-cards").mCustomScrollbar({
            axis:"y",
            scrollbarPosition: "outside",
            advanced:{
              updateOnContentResize: true
            }
          });
        }
      });
    }



    this.loadMap = function(){
    	var map = new Datamap({
    		element: document.getElementById("map-container"),
    		projection: 'cylindricalStereographic',
    		fills:{
    			defaultFill:'rgba(0,0,0,0.5)',
    			'NA': '#4CB074',
    			'SA': '#F5670F',
    			'AF': '#dcb312',
    			'EU': '#31b0c9',
    			'AS': '#1675a9',
    			'AU': '#006EB8'
    		},
    		data:{
    			'USA': {fillKey: 'NA'},
    			'CAN': {fillKey: 'NA'},
    			'PER': {fillKey: 'SA'},
    			'ARG': {fillKey: 'SA'},
    			'ECU': {fillKey: 'SA'},
    			'NIC': {fillKey: 'SA'},
    			'PRI': {fillKey: 'SA'},
    			'BLZ': {fillKey: 'SA'},
    			'JAM': {fillKey: 'SA'},
    			'CRI': {fillKey: 'SA'},
    			'ZAF': {fillKey: 'AF'},
    			'MWI': {fillKey: 'AF'},
    			'KEN': {fillKey: 'AF'},
    			'UGA': {fillKey: 'AF'},
    			'AUS': {fillKey: 'AU'},
    			'IND': {fillKey: 'AU'},
    			'MYS': {fillKey: 'AU'},
    			'MNG': {fillKey: 'AU'},
    			'ESP': {fillKey: 'EU'},
    			'FRA': {fillKey: 'EU'},
    			'ITA': {fillKey: 'EU'},
    			'GBR': {fillKey: 'EU'},
    			'IRL': {fillKey: 'EU'},
    		},
    		geographyConfig:{
    			borderColor: 'rgba(255,255,255,0.8)',
    			popupOnHover:false
    			//highlightFillColor: 'yellow',
    			//highlightBorderColor: 'green',
    			//highlightFillOpacity: 0.75
    		},
    		done:function(datamap){
    			datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography){
    				if(geography.properties.continent != undefined){
    					window.location.href = "/continent.html?continent=" + geography.properties.continent;
    				}
    			});
    		}
    	});
    }

    this.loadContinentMap = function(){
    	var map = new Datamap({
    		element: document.getElementById("map-container"),
    		// projection: 'cylindricalStereographic',
    		setProjection: function(element) {
			    var projection = d3.geo.equirectangular()
			      .center([23, -3])
			      .rotate([4.4, 0])
			      .scale(200)
			      .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
			    var path = d3.geo.path()
			      .projection(projection);

			    return {path: path, projection: projection};
			  },
    		fills:{
    			defaultFill:'white',
    			'NA': '#4CB074',
    			'SA': '#F5670F',
    			'AF': '#dcb312',
    			'EU': '#31b0c9',
    			'AS': '#1675a9',
    			'AU': '#006EB8'
    		},
    		data:{
    			'USA': {fillKey: 'NA'},
    			'CAN': {fillKey: 'NA'},
    			'PER': {fillKey: 'SA'},
    			'ARG': {fillKey: 'SA'},
    			'ECU': {fillKey: 'SA'},
    			'NIC': {fillKey: 'SA'},
    			'PRI': {fillKey: 'SA'},
    			'BLZ': {fillKey: 'SA'},
    			'JAM': {fillKey: 'SA'},
    			'CRI': {fillKey: 'SA'},
    			'ZAF': {fillKey: 'AF'},
    			'MWI': {fillKey: 'AF'},
    			'KEN': {fillKey: 'AF'},
    			'UGA': {fillKey: 'AF'},
    			'AUS': {fillKey: 'AU'},
    			'IND': {fillKey: 'AU'},
    			'MYS': {fillKey: 'AU'},
    			'MNG': {fillKey: 'AU'},
    			'ESP': {fillKey: 'EU'},
    			'FRA': {fillKey: 'EU'},
    			'ITA': {fillKey: 'EU'},
    			'GBR': {fillKey: 'EU'},
    			'IRL': {fillKey: 'EU'},
    		},
    		geographyConfig:{
    			borderColor: 'black',
    			//highlightFillColor: 'yellow',
    			//highlightBorderColor: 'green',
    			//highlightFillOpacity: 0.75
    		}
    	});
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
		//this.drawMap();
		this.parallax();
		this.setIntroImage();

    }

    this.parallax = function () {
		$(window).stellar();

    }

    this.scrollUpdate = function () {
    $('#expedition-cards').mCustomScrollbar("update");
}


    this.attachListeners = function() {
		console.log("in attachListeners");

		// $(".research-select").each(function() {
		// 	console.log($(this));
		// })

		$(".research-select").click(function() {

			// var str = $(this).attr('class');
			// console.log("all classes = "+str);
			// str = str.split(new RegExp("\\s+")).pop();
			// console.log("split string = "+str);
			var outlineColor = $(this).attr('class').split(new RegExp("\\s+")).pop();
			console.log($(this).attr('class'));
			console.log(outlineColor);
			$(this).children("div").addClass("select-inverse");
			$(this).removeClass("no-background");
			$(this).addClass("select-clicked");
			// console.log(children);
			//children[0].addClass("select-inverse");
			//console.log("in research select");
			//console.log(otherButtons);
			$('.research-select:not(.' + outlineColor + ')').each(function() {
				$(this).children("div").removeClass("select-inverse");
				$(this).addClass("no-background");
				$(this).removeClass("select-clicked");
			})
      var cards = $("#mCSB_1_container");
      cards.empty();
      exp_type = exp_continent[$(this).attr('id')];
      if (exp_type) {
        for (var i = 0; i < exp_type.length; i++) {
          var temp = $("#card-template").html();
          var html = Mustache.render(temp,exp_type[i]);
          cards.append(html);
        }
        $("#expedition-cards").mCustomScrollbar("scrollTo","top");

      }
		});

		$(".research-select").mouseover(function() {

			$(this).removeClass("no-background");

		});

		$(".research-select").mouseout(function() {
			if (!$(this).hasClass("select-clicked")) {
				$(this).addClass("no-background");
			}


		});

		$(".activity-tab").click(function() {
			$('.activity-tab').each(function() {
				$(this).removeClass("active-level");
			})
			$(this).addClass("active-level");

      var cards = $("#mCSB_1_container");
      cards.empty();
      var level = $(this)[0].innerHTML;
      for (exp in exp_type) {
        if(level != 'All' && exp_type[exp]['Activity Level'] == level) {
          var temp = $("#card-template").html();
          var html = Mustache.render(temp,exp_type[exp]);
          cards.append(html);
        } else if (level == 'All') {
          var temp = $("#card-template").html();
          var html = Mustache.render(temp,exp_type[exp]);
          cards.append(html);
        };
      }
      $("#expedition-cards").mCustomScrollbar("scrollTo","top");
		})

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
		 $("#ew-continent-intro").css("background-size", size);
		  $("#activities-anchor").css("background-size", size);

	}


    this.drawMap = function(mapJSON) {
		var mapRatio = 0.5;


		var width = 1000,
		    height = 900;

		var container = document.getElementById("map-container");
		if (container) {
			height = container.clientWidth / 1.8;
			width = container.clientWidth;
		}

		var sideCol = document.getElementById("map-side-col");
		if (sideCol) {
			sideCol.style.height = height+"px";
		}



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

		  	if (error) throw error;

			var countries = topojson.feature(world, world.objects.countries).features,
			  neighbors = topojson.neighbors(world.objects.countries.geometries);



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


			svg.insert("path", ".graticule")
			  .datum(topojson.feature(world, world.objects.land))
			  .attr("class", "land")

			  .attr("d", path)
			  .attr("class", "country-land continent");


			svg.insert("path", ".graticule")
			  .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
			  .attr("class", "boundary")
			  .attr("d", path)
			  .attr("class", "country-outline");





		});
		this.mapListeners();

	}



	this.mapListeners = function() {

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


   this.getUrlParameter = function (sParam) {
      var sPageURL = decodeURIComponent(window.location.search.substring(1)),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;

      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');

          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : sParameterName[1];
          }
      }
  };


};
