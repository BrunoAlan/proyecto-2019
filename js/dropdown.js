$(document).ready(function() {
	$(".drop li:has(ul)").click(function(e) {
		if ($(this).hasClass("activado")) {
			$(this).removeClass("activado");
			$(this)
				.children("ul")
				.slideUp();
		} else {
			$(".drop li ul").slideUp();
			$(".drop li").removeClass("activado");
			$(this).addClass("activado");
			$(this)
				.children("ul")
				.slideDown();
		}
	});
});
