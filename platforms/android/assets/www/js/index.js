function load(event) {
	console.log("hola");
	var li = jQuery("#tweets").children("li");
	for ( var i = 0; i < 10; i++) {
		jQuery(li[i])
				.on(
						"click",
						function(evt) {

							var ver = document.getElementById("ver-tw");
							ver.setAttribute("style",
									"visibility: visible; position: relative;");

							var t = document.getElementById("twitter");
							t.removeAttribute("style");
							t.setAttribute("style", "display: none;");

							var iner = jQuery(this).children("a")[0].innerHTML;
							iner = iner.toString().replace("liga", "a");
							iner = iner.toString().replace("liga", "a");
							jQuery("#content-ver-tw").html(iner);

							var re_url = this.getElementsByTagName("retweet")[0].innerHTML;
							var retw = document.getElementById("retweet");
							retw.href = re_url;

							var rp_url = this.getElementsByTagName("reply")[0].innerHTML;
							var rptw = document.getElementById("reply");
							rptw.href = rp_url;

							var re_url = this.getElementsByTagName("favorite")[0].innerHTML;
							var retw = document.getElementById("favorite");
							retw.href = re_url;

						});
	}
};



