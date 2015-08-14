

var earthwatch = new earthwatchObject;

$(document).ready(function() {
    if (isIE(8, 'lte')) {
      window.location.href = "IE8.html";
    }
    var continent = earthwatch.getUrlParameter('continent');
    if (continent != null) {
      earthwatch.loadContinent(continent,earthwatch);
    }
    earthwatch.setup();
    //if on continent page

});

$(window).resize(function() {
	earthwatch.resize();
});

// North America
var AMERICA = 840,
	CANADA = 124;


// South America
var PERU = 604,
	ECUADOR = 218,
	BELIZE = 84,
	JAMAICA = 388,
	PUERTO_RICO = 630;

// Europe
var ITALY = 380,
	SPAIN = 724,
	FRANCE = 250,
	GERMANY = 276,
	UK = 826,
	MONACO = 492,
	SLOVENIA = 705;

// Africa
var SOUTH_AFRICA = 710,
	MALAWI = 454,
	UGANDA = 800,
	KENYA = 404;

// ASIA
var AUSTRALIA = 36,
	INDIA = 356,
	MALAYSIA = 458,
	MONGOLIA = 496;


var INTRO_IMG_HEIGHT = 484;
var INTRO_IMG_WIDTH = 1000;

var CONNECT_ROW_ID = "connect-row";
var EW_CONTENT_ID = "ew-content";

var CONTINENT_PAGE = true;

var CURRENT_MAP = "../json/world.json";

var northAmerica = [AMERICA, CANADA];
var southAmerica = [PERU, ECUADOR, BELIZE, JAMAICA, PUERTO_RICO];
var europe = [ITALY, SPAIN, FRANCE, GERMANY, UK, MONACO, SLOVENIA];
var africa = [SOUTH_AFRICA, MALAWI, UGANDA, KENYA];
var asia = [AUSTRALIA, INDIA, MALAYSIA, MONGOLIA];

function earthwatchObject() {
    this.continent,
    this.activityLevel,
    this.researchType;
    this.levelDescriptions = {
    	"all": "Hover over each activity level tab for a more detailed description",
    	"very-easy": "Very Easy: Mostly lab work; must be able to walk up to 1 mile/day (1.6 km) over flat terrain. Dexterity often required.",
    	"easy": "Some walking over uneven ground, small hills; must be able to walk up to 3 miles/day (5km) with personal supplies up to 5lbs (2.3 kg). Dexterity, mobility and good balance required. For water-based projects: Must be able to swim or tread water for 5 minutes unaided by buoyancy devices.",
    	"moderate": "Must be able to walk, possibly in sand or uphill, with a light pack up to 5 miles/day (8 km); ability to stoop, bend or kneel often required; must be able to carry equipment weighing up to 10lbs (4.5 kg). Dexterity, agility and good balance required. For water-based projects: Must be able to swim at least 110 yards (100m) unaided by buoyancy devices.",
    	"very-active": "Very Active: Must be able to walk up to 10 miles/day (16 km), possibly in sand or uphill, climbing over rocks or fences, and/or at high altitude; must be able to carry equipment weighing up to 20lbs (9 kg) for several days in a row. Dexterity, agility and good balance required. Must be able to move quickly if needed. For water-based projects: Must be able to swim at least 220 yards feet (200m) unaided by buoyancy devices. For snorkel/scuba projects: Must be able to surface dive to at least 15 feet (4.6m) multiple times per day or perform 2-3 dives per day at less than 65 feet (20m).",
    	"strenuous": "Must be able to hike up to 15 miles/day (25 km) for several days in a row, possibly in backcountry and/or uphill; must be able to carry equipment weighing up to 40lbs (18 kg). Dexterity, agility, stamina and good balance required. For water-based projects: Must be able to swim at least 550 yards (500m) unaided by buoyancy devices. For snorkel/scuba projects: Must be able to surface dive to at least 20 feet (6m) consistently throughout the day or perform 4-5 dives per day at up to 65 feet (20m).",
    	"varies": "Some projects may be able to accommodate varying levels of fitness due to some activities being more or less strenuous than others on the same project. Please refer to the project description or contact Earthwatch for additional information specific to the research activities and fitness required."
    }
    var exp_continent,exp_type,all_exp;


    this.setup = function() {
		//this.loadSections();


		this.crossBrowser();
		this.parallax();
		this.mobileScroll();
		this.diagonalSizing();
		this.attachListeners();

		 if ($(".expedition-card").length > 1) {
			$(".expedition-cards").mCustomScrollbar({
				axis:"y",
				scrollbarPosition: "inside",
        advanced:{
          updateOnContentResize: true
        }
			});
		}

		//this.drawMap();
		this.loadMap();
		this.mapListeners();

		$(".activity-tab").each(function(){
			if(!$(this).hasClass("active-level")){
				$(this).addClass("inactive-level");
			}
		});

    }

    this.resize = function() {

		this.parallax();
		this.mobileScroll();
		this.diagonalSizing();
    	console.log("in resize");
    	this.resizeResearch();


	


    }


    this.resizeResearch = function() {
		$(".research-section-background").each(function() {
			console.log("research-section-background resize");
			var h = $(this).height();
			var w = $(this).width();
			var ratio = 1.5;
			
			if (ratio < (w/h)) {
				console.log($(this).attr("id")+" = 100% auto")
				$(this).css("background-size", "100% auto");
			} else {
				console.log($(this).attr("id")+" =  auto 100%")
				$(this).css("background-size", "auto 100%");
			}

		})

    }

    this.mobileScroll = function() {
    	var mobileWidth = 767;
		console.log("parallax on resize");

		var pastTheme = "rounded-dots";
		var scrollTheme = 'inset-3-dark';
		var oldScrollPosition = 'inside';
		var scrollPosition = 'outside';
		if ($(window).width() <= mobileWidth) {
			console.log("change to rounded-dots");
			scrollTheme = "rounded-dots";
			pastTheme = "inset-3-dark";
			scrollPosition = "inside";
			oldScrollPosition = "outside"


		}

		$(".research-expedition-cards").each(function() {
			console.log("changing attr");
			$(this).attr("data-mcs-theme", scrollTheme);
		});

		$(".mCS-"+pastTheme).each(function() {
			console.log("removing mCS-"+pastTheme);
			$(this).removeClass("mCS-"+pastTheme);
			$(this).addClass("mCS-"+scrollTheme);


		})

		$(".mCSB_"+oldScrollPosition).each(function() {
			console.log("removing mCSB_"+pastTheme);
			$(this).removeClass("mCSB_"+oldScrollPosition);
			$(this).addClass("mCSB_"+scrollPosition);

		})
    }



    this.loadContinent = function(continentNum) {
      var valid_numbers = ["1","2","3","4","5"];
      var enum_map = {1:["North America","NA"], 2:["Central, South America & The Caribbean","CA"], 3:["Europe",'europe'], 4:["Africa",'africa'], 5:["Asia & Australia","asia_australia"]};
      if (isNaN(continentNum)) {
        window.location.href = 'index.html';
      }
      if (valid_numbers.indexOf(continentNum) == -1) {
        window.location.href = 'index.html';
      }
      continent = enum_map[continentNum][0];
      $("#activities-anchor").hide();

        //pupulate the continent name/images
        var continentshort = enum_map[continentNum][1];
        $(".ew-continent-intro").css('background','url("../images/'+continentshort+'_intro-bg.jpg")')
        $("#wildlife-section").css('background','url("../images/'+continentshort+'-wildlife-bg.jpg");')
        $("#climate-section").css('background','url("../images/'+continentshort+'-CC-bg.jpg");')
        $("#ocean-section").css('background','url("../images/'+continentshort+'-ocean-bg.jpg");')
        $("#archaeology-section").css('background','url("../images/'+continentshort+'-arch-bg.jpg");')
        $("#continent-wel").html('Welcome to ' + continent + '!');
        $("#continent-nav").html(continent+" <span class='caret'></span>");
        $("#continent-nav").width($("#continent-dropdown-menu").width());

        var data = Continents;
        exp_continent = data[continent];

        $.map(exp_continent,function(v,i) {
          var type;
          switch (i) {
            case "Wildlife & Ecosystems":
              type = "wildlife";
              break;
            case "Ocean Health":
              type = "ocean";
              break;
            case "Climate Change":
              type = "climate"
              break;
            case "Archaeology & Culture":
              type = "archaeology";
            default:
              break;
          }
          var cards = $("#expeditions-" + type);
          var levelArr = {"Very Easy":0,"Easy":0,"Moderate":0,"Very Active":0,"Strenuous":0,"Varies":0};
          v.map(function(exp) {
            levelArr[exp["Activity Level"]] = levelArr[exp["Activity Level"]] + 1;
            exp["typeclass"] = 'exp-'+type;
            var temp = $("#card-template").html();
            var html = Mustache.render(temp,exp);
            cards.append(html);
            iconArr = ["Boating","Digging","Diving","Flat LandHiking","High Temp","Low Temp","Snorkeling","Swimming","Teen","Uphill Hiking","Wildlife"];
            var iconDiv = $("#activity-icon-"+exp["Booking URL"]);
            for (var index in iconArr) {
              if (exp[iconArr[index]] != null) {
                var iconTemp = $("#activity-icon-template").html();
                var imgURL = iconArr[index].toLowerCase();
                switch (iconArr[index]) {
                  case "High Temp":
                    imgURL = "hitemp"
                    break;
                  case "Low Temp":
                    imgURL = "lotemp"
                    break;
                  case "Flat Land Hiking":
                    imgURL = "hiking"
                    break;
                  case "Uphill Hiking":
                    imgURL = "uphillhiking"
                    break;
                  default:
                    break;
                }
                var html = Mustache.render(iconTemp,{"icon":"../images/"+imgURL+'.png'});
                iconDiv.append(html);
              }
            }
          });
          var levelCount = 0;
          var NoLevExp = false;
          $.map(levelArr,function(item,level) {
            if (levelArr[level] == 0) {
              var disableLevel = level.toLowerCase();
              switch (level) {
                case "Very Easy":
                  disableLevel = 'very-easy';
                  break;
                case "Very Active":
                  disableLevel = 'very-active';
                  break;
                default:
                  break;
              }
              // $("."+type+"-"+disableLevel).fadeTo(0,0.5);
              $("."+type+"-"+disableLevel).removeClass("activity-tab");
              $("."+type+"-"+disableLevel).css({'cursor':'default','background-color':'rgba(84,84,84,0.7)','color':'#808080'});
              $(".opt-"+type+"-"+disableLevel).remove();
            } else if (level != '') {
              levelCount++;
            } else {
              NoLevExp = true;
            }
          })
          if(levelCount == 1 && !NoLevExp) {
            $(".opt-"+type+"-all").remove();
            for (var index in v) {
              if(v[index]["Activeity Level"] != "") {
                var onlyLev = v[index]["Activity Level"].toLowerCase();
                if (v[index]["Ativity Level"] == 'Very Easy') onlyLev = 'very-easy';
                if (v[index]["Ativity Level"] == 'Very Active') onlyLev = 'very-active';
                  $("."+type+"-"+onlyLev).addClass("active-level");
                  $("."+type+"-all").removeClass("activity-tab active-level");
                  // $("."+type+"-all").fadeTo(0,0.5);
                  $("."+type+"-all").css({'cursor':'default','background-color':'rgba(84,84,84,0.7)','color':
                '#808080'});
              }
              break;
            }
          }
          if (cards.children().length > 0) {
            cards.addClass("mCustomScrollbar")
            $("#expedition-cards").mCustomScrollbar({
              axis:"y",
              scrollbarPosition: "outside",
              advanced:{
                updateOnContentResize: true
              }
            });
          }
        })
        typeArr = ["wildlife","ocean","climate","archaeology"];
        for (index in typeArr) {
          if ($("#expeditions-"+typeArr[index]).children().length == 0) {
            $("#step2-" + typeArr[index]).fadeTo(0,0.1);
            $(".step2-select-"+typeArr[index]).fadeTo(0,0.1);
            $(".step2-select-"+typeArr[index]+" div").text("Unavailable");
            $(".step2-select-"+typeArr[index]).removeAttr('href');
            $("#"+typeArr[index]+"-section").hide();
            $(".step2-select-"+typeArr[index]+"-hori").hide();

          }
        }

    }



    this.loadMap = function(){
    	var map = new Datamap({
    		element: document.getElementById("map-container"),
    		projection: 'cylindricalStereographic',
    		fills:{
    			defaultFill:'rgba(245,245,245,0)',
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
    			borderColor: 'rgba(52,62,72,1)',
    			borderWidth:1.5,
    			popupOnHover:false,
    			highlightFillColor: function(data){
    				if(data.fillKey){
    					return data.fillKey;
    				}else{
    					return 'rgba(245,245,245,0)';
    				}
    			},
    			highlightBorderWidth: function(data){
    				if(data.fillKey){
    					return 3;
    				}else{
    					return 1.5;
    				}
    			}
    		},
    		done:function(datamap){
    			datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography){
    				if(geography.properties.continent != undefined){
    					window.location.href = "/continent.html?continent=" + geography.properties.continent;
    				}
    			});
    			datamap.svg.selectAll('.datamaps-subunit').on('mouseover', function(geography){

            if(geography.properties.continent != undefined){
              $(this).css("cursor", "pointer");
              var color = $(this).css("fill");

              $('path').each(function(){
                  if($(this).css("fill") === color){
                    console.log(this.style);
                    this.style.stroke = "yellow";
                    this.style.strokeWidth = "2px";
                  }
              });
             
            }
    			});
          datamap.svg.selectAll('.datamaps-subunit').on('mouseout', function(geography){
              $('path').each(function(){
                    this.style.stroke = "black";
                    this.style.strokeWidth = "1px";
              });

          });
    		}
    	});
    }

    this.loadSections = function () {
    	//console.log("in load sections");
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
		this.parallax();


    }

    this.diagonalSizing = function() {
    	var w = $(window).width();

    	$(".slope-down-1").css("border-left", w+"px solid #fff");
    	$(".slope-down-1").css("border-left", w+"px solid transparent");

    	// $(".slope-down-2").css("border-right", w+"px solid #fff");
    	$(".slope-down-2").css("border-right", w+"px solid transparent");

    	$(".slope-up-1").css("border-left", w+"px solid ");
    	$(".slope-up-2").css("border-right", w+"px solid");




    }





    this.crossBrowser = function() {

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {     // If Internet Explorer, return version number
            // $("body").css('min-width', '798px');
            return;
        } else  {               // If another browser, return 0
            $(window).stellar();
		}
    }

    this.parallax = function () {
    	//console.log("in parallax");
    	var sectionIds = ["#wildlife-section", "#ocean-section", "#climate-section", "#archaeology-section", "#activities-anchor"];

		var windowHeight = $(window).height();
		var windowWidth = $(window).width();
		var ratio = (4.25/3.25);

    	for (var i = 0; i < sectionIds.length; i++) {
    		$(sectionIds[i]).attr("data-stellar-vertical-offset", 1.5*windowHeight);


    	};

    	$("#climate-section").attr("data-stellar-vertical-offset", 1*windowHeight);
    	$("#archaeology-section").attr("data-stellar-vertical-offset", 1*windowHeight);

			if (ratio < (windowWidth/windowHeight)) {
				$("#ew-continent-intro").css("background-size", "120% auto");
				$("#ew-intro").css("background-size", "120% auto");
				$(".research-section-background").css("background-size", "100% auto");
			} else {
				$("#ew-continent-intro").css("background-size", "auto 150%");
				$("#ew-intro").css("background-size", "auto 150%");
				$(".research-section-background").css("background-size", "auto 100%");
			}




        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {     // If Internet Explorer, return version number
            // $("body").css('min-width', '798px');
            return;
        } else  {               // If another browser, return 0
            $(window).stellar();
		}



    }

    this.attachListeners = function() {
		var that = this;
		// $( window ).resize(function() {
		// 	that.parallax();
		// });



		$(".research-select").click(function() {
      if($(this).attr('href') == null) {
        return;
      }
      		$("#activities-anchor").show();

      $(".research-select").each(function() {
        $(this).children('div').removeClass("select-inverse");
        $(this).addClass("no-background");
        $(this).removeClass("select-clicked");
      });
			$(this).children("div").addClass("select-inverse");
			$(this).removeClass("no-background");
			$(this).addClass("select-clicked");
		});

		$(".research-select").mouseover(function() {

			$(this).removeClass("no-background");

		});

		$(".research-select").mouseout(function() {
			if (!$(this).hasClass("select-clicked")) {
				$(this).addClass("no-background");

			}


		});

    $(".level-selection").change(function() {
        var levId = $(this).attr('id');
        var level = $("#"+levId+" option:selected").text();
        var type = levId.split('-')[0];
        var cardArr = $(".exp-"+type);
        var cards;
        if ($("#mCSB_1_container").children().length > 0) {cards = $("#mCSB_1_container");}
        else {cards = $("#expeditions-" + type);}
        var count = 0;
        if (level == 'All') {
            for(var i = 0;i < cardArr.length;i++) {
              if (cardArr[i] != null) {cardArr[i].style.display = ''; count++;}
            }
        } else {
          for(var i = 0;i < cardArr.length;i++) {
            var obj = cardArr[i];
            var classArr = obj.className.split(' ');
            var cardLev = classArr[classArr.length - 1];
            if (classArr[classArr.length - 2] == 'Very') {
              cardLev = 'Very ' + cardLev;
            }
            if (cardLev == level) {obj.style.display = ''; count++;}
            else {obj.style.display = 'none';}
          }
        }
        $("#expedition-cards").mCustomScrollbar("scrollTo","top");
    })

		$(".activity-tab").click(function() {
  			$(this).siblings().each(function() {
  				$(this).removeClass("active-level");
  				$(this).addClass("inactive-level");
  			});
	  		$(this).removeClass("inactive-level");
	  		$(this).addClass("active-level");

			var level = $(this)[0].innerHTML;
			var classArr = $(this).parent().attr('class').split(' ');
			var type = classArr[classArr.length - 1];
			var cardArr = $(".exp-"+type);

			var cards;
			if ($("#mCSB_1_container").children().length > 0) {cards = $("#mCSB_1_container");}
			else {cards = $("#expeditions-" + type);}
			// cards.empty();
			var count = 0;
			if (level == 'All') {
				for(var i = 0;i < cardArr.length;i++) {
			    	if (cardArr[i] != null) {cardArr[i].style.display = ''; count++;}
				}
			} else {
		        for(var i = 0;i < cardArr.length;i++) {
					var obj = cardArr[i];
					var classArr = obj.className.split(' ');
					var cardLev = classArr[classArr.length - 1];
					if (classArr[classArr.length - 2] == 'Very') {
						cardLev = 'Very ' + cardLev;
					}
					if (cardLev == level) {
						obj.style.display = ''; count++;
					} else {
						obj.style.display = 'none';
					}
		        }
    		}
	  		$("#expedition-cards").mCustomScrollbar("scrollTo","top");

		});


		$(".activity-tab-info-text").css("display", "none");
		$(".activity-tab-info-text-div").css("display", "none");
		var that = this; 
		$(".activity-tab").mouseover(function() {
			var level = $(this).attr("activity-level");
			$(this).removeClass("inactive-level");
      var text = $(this).text();
			$(this).parent().siblings('.activity-tabs-arrows').children().each(function() {
				
				if ($(this).attr("activity-level") == level) {

					var newHtml = "<strong class='text-uppercase '>"+level.replace('-', "&#160;")+": </strong><span class='text-dark-grey'>"+that.levelDescriptions[level]+"</span>";


					$(this).addClass("active-level");

          			var textDiv = $(this).parent().siblings(".activity-tab-info-text-div");
          			textDiv.css("display", "block");
					textDiv.children().first().addClass("active")
										.show()
					                    .html(newHtml)
					                    .css("display", "block")
					                    .css("max-height", "1000px")
					                    .css("padding", "15px");
					that.resizeResearch();
				}
			});

		})






		$(".activity-tab").mouseout(function() {
			var level = $(this).attr("activity-level");
			$(".activity-tab-info").each(function() {
				if ($(this).attr("activity-level") == level) {
					$(this).removeClass("active-level");
					$(".activity-tab-info-text").removeClass("active");
					$(".activity-tab-info-text").css("display", "none");
					$(".activity-tab-info-text-div").css("display", "none");
					$(".activity-tab-info-text").css("max-height", "0px");
					$(".activity-tab-info-text").css("padding", "0px 15px 0px 15px");
					that.resizeResearch();
				}
			});
			if(!$(this).hasClass("active-level")){$(this).addClass("inactive-level");}
		})






		$('a').click(function(){
	      if($(this).attr('href') == null || $(this).attr('href') == '#') {
	        return;
	      }


      		if($(this).hasClass("has-scroll")) {
				var scroll = $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top - 50;
				//console.log(scroll);
			    $('html, body').animate({
			        scrollTop: scroll
			    }, 500);




			    return false;
      		}

		});



    }






//     this.drawMap = function(mapJSON) {
// 		var mapRatio = 0.5;


// 		var width = 1000,
// 		    height = 900;

// 		var container = document.getElementById("map-container");
// 		if (container) {
// 			height = container.clientWidth / 1.8;
// 			width = container.clientWidth;
// 		}

// 		var sideCol = document.getElementById("map-side-col");
// 		if (sideCol) {
// 			sideCol.style.height = height+"px";
// 		}



// 		var projection = d3.geo.cylindricalStereographic()
// 		    .parallel(45)
// 		    .scale((width/550)*100)
// 		    .translate([width / 2, height / 2])
// 		    .precision(.1);


// 		var path = d3.geo.path()
// 		    .projection(projection);

// 		var graticule = d3.geo.graticule();

// 		var svg = d3.select("#map")
// 		    .attr("width", width)
// 		    .attr("height", height);

// 		svg.append("path")
// 		    .datum(graticule)
// 		    .attr("class", "graticule")
// 		    .attr("d", path);

// 		d3.json(CURRENT_MAP, function(error, world) {

// 		  	if (error) throw error;

// 			var countries = topojson.feature(world, world.objects.countries).features,
// 			  neighbors = topojson.neighbors(world.objects.countries.geometries);



// // WORLD MAP
// 			svg.selectAll(".country")
// 			  .data(countries)
// 			.enter().insert("path", ".graticule")
// 			  .attr("class", "country-no-fill")

// 			  .attr("d", path)
// 			  .attr("id", function(d) { if(d) {return "country" + d.id;} })
// 			  .attr("class", function(d) {

// 			  					var className = "country-no-fill ";
// 			  					if (d) {
// 				  					if (northAmerica.indexOf(d.id) != -1) {
// 				  						className += "continent-northamerica";
// 				  					} else if (southAmerica.indexOf(d.id) != -1) {
// 				  						className += "continent-southamerica";
// 				  					} else if (europe.indexOf(d.id) != -1) {
// 				  						className += "continent-europe";
// 				  					} else if (africa.indexOf(d.id) != -1) {
// 				  						className += "continent-africa";
// 				  					} else if (asia.indexOf(d.id) != -1) {
// 				  						className += "continent-asia";
// 				  					}
// 				  				}
// 				  				return className;

// 							})


// 			svg.insert("path", ".graticule")
// 			  .datum(topojson.feature(world, world.objects.land))
// 			  .attr("class", "land")

// 			  .attr("d", path)
// 			  .attr("class", "country-land continent");


// 			svg.insert("path", ".graticule")
// 			  .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
// 			  .attr("class", "boundary")
// 			  .attr("d", path)
// 			  .attr("class", "country-outline");





// 		});
// 		this.mapListeners();

// 	}



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

function isIE(version, comparison) {
  var cc      = 'IE',
      b       = document.createElement('B'),
      docElem = document.documentElement,
      isIE;
      
  if(version){
    cc += ' ' + version;
    if(comparison){ cc = comparison + ' ' + cc; }
  }
  
  b.innerHTML = '<!--[if '+ cc +']><b id="iecctest"></b><![endif]-->';
  docElem.appendChild(b);
  isIE = !!document.getElementById('iecctest');
  docElem.removeChild(b);
  return isIE;
}
