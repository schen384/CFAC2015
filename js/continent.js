var getUrlParameter = function getUrlParameter(sParam) {
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

$(document).ready(function () {
  var continent = getUrlParameter('continent');
  $.getJSON('../json/expeditions.json', function(data) {
    exp_continent = data[continent];
    var cards = $("#expedition-cards");
    var temp = $("#card-template").html();
    var html = Mustache.render(temp,{ name: "Jack" });

    cards.append(html);
});


});
