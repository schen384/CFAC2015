$('a').click(function(){

	var scroll = $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top - 50;
	console.log(scroll);
    $('html, body').animate({
        scrollTop: scroll
    }, 500);
    return false;
});