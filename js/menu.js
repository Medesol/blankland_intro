
$(document).ready(function () {
	var cl = $("#22").clone();
	cl.css({
		visibility: "hidden"
	});
	var offset11 = cl.offset();
	$("#22").after(cl);
	$("#22").css({
		position: "absolute"
	});
	$("#22").width($("#11").width() * 2);
	var ishovering = false;
	$("#11").mouseenter(
		function () {
			$("#22").fadeIn();
		}
	);
	$("#11").mouseleave(
		function () {
			if (!ishovering) {
				setTimeout(function () {
					if (!ishovering) {
						$("#22").fadeOut(300, function () {
							$("#22").stop(true, true);
						});
					}
				}, 100);
			}

		}
	);
	$("#22").mouseenter(
		function () {
			ishovering = true;
		}
	);
	$("#22").mouseleave(
		function () {
			ishovering = false;
			setTimeout(function () {
				$("#22").fadeOut(300, function () {
					$("#22").stop(true, true);
				});
			}, 100);
		}
	);
});