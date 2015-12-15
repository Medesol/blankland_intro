function Fog(jquerydom) {
	'use strict';
	this.jquerydom = jquerydom;
	this.isVisible = function () {
		return !this.jquerydom.hasClass("disappear");
	};
	this.disappear = function () {
		//this.jquerydom.
		var x = this.jquerydom.offset();
		this.jquerydom.css("position", "absolute");
		this.jquerydom.css("left", x.left + "px");
		this.jquerydom.css("top", x.top + "px");
		this.jquerydom.fadeOut(200);
	};
	this.showSelf = function () {
		this.jquerydom.css("position", "static");
		this.show();
	};
	this.whenOpen = function (eventFunc) {
		this.jquerydom.click(eventFunc);
	};
}

function NumberSign(number, jquerydom) {
	'use strict';
	this.number = number;
	this.jquerydom = jquerydom;
	this.jquerydom.html("<span></span>");
	this.currentTheme = "";
	var contentdom = this.jquerydom.children();
	contentdom.text(number.toString());
	this.isVisible = function () {
		return !this.jquerydom.hasClass("disappear");
	};
	this.setNumber = function (x) {
		this.number = x;
		if (this.isVisible()) {
			contentdom.animate({
				fontSize: "toggle"
			}, 70, function () {
				contentdom.text(x.toString());
				contentdom.animate({
					fontSize: "toggle"
				}, 70);
			});
		} else {
			contentdom.text(x.toString());
		}
	};
	this.addNumber = function (x) {
		this.setNumber(this.number + x);
	};
	this.disappear = function () {
		this.jquerydom.addClass("disappear");
	};
	this.showSelf = function () {
		this.jquerydom.removeClass("disappear");
	};
	this.changeTheme = function (theme) {
		this.jquerydom.removeClass(this.currentTheme);
		this.currentTheme = theme;
		this.jquerydom.addClass(theme);
	};

}

function Element(elementType, position, towards, callback) {
	'use strict';
	var eledom = $("<div class='element'></div>");
	eledom.addClass("cell-" + elementType);
	eledom.offset(position);
	eledom.hide();
	eledom.appendTo("body");
	//var cssto = {left:towards+"px"};
	eledom.fadeIn(300, function () {
		eledom.animate(towards, 1000).fadeOut(300, function () {
			eledom.remove();
			if (callback !== undefined) {
				callback();
			}
		});
	});
}

function Cell(jquerydom) {
	'use strict';
	this.jquerydom = jquerydom;
	jquerydom.html("<div class='cell number'></div><button class='cell fog' type='button'></button>");
	var fog = new Fog(jquerydom.children(".fog"));
	var number = new NumberSign(0, jquerydom.children(".number"));
	//number.changeTheme("number-" + elementType);
	this.getOffset = function () {
		return jquerydom.offset();
	};
	number.disappear();
	var whenClick = function (cellPosition) {
		var ele = new Element("water", cellPosition, jquerydom.offset());
	};
	fog.whenOpen(function () {
		fog.disappear();
		whenClick(jquerydom.offset());
		number.showSelf();
	});
	this.setClickEvent = function (eventFunc) {
		whenClick = eventFunc;
	};
	this.changeTheme = function (theme) {
		number.changeTheme("number-" + theme);
	};
	this.setNumber = function (num) {
		number.setNumber(num);
	};
	this.getNumber = function () {
		return number.number;
	};
	this.addNumber = function (num) {
		number.addNumber(num);
	};
	this.row = 0;
	this.column = 0;
	this.fog = fog;
	this.number = number;
}

function Map(jquerydom, width, height) {
	'use strict';
	this.jquerydom = jquerydom;
	var tabledom = $("<table></table>");
	var click = function (absolute, cell) {};
	var p_click = function (absolute) {
		//click();
	};
	var i, j;
	var cellArray = new Array();
	for (i = 0; i < width; i++) {
		var trdom = $("<tr></tr>");
		cellArray[i] = new Array();
		for (j = 0; j < height; j++) {
			var tddom = $("<td></td>");
			var cell = new Cell(tddom);
			cell.row = i;
			cell.column = j;
			cell.setClickEvent(p_click);
			cellArray[i][j] = cell;
			tddom.appendTo(trdom);
		}
		trdom.appendTo(tabledom);
	}

	tabledom.appendTo(jquerydom);
	/*this.setOnClick = function (eventFunc) {
		click = eventFunc;
	};*/
	this.get = function (row, column) {
		return cellArray[row][column];
	};
	//jquerydom.width(this.get(0, 0).jquerydom.width() * (width * 1.2));
	this.foreachCell = function (func) {
		var xa, ya;
		for (xa = 0; xa < cellArray.length; xa++) {
			for (ya = 0; ya < cellArray[xa].length; ya++) {
				func(cellArray[xa][ya]);
			}
		}
	};
	this.changeTheme = function (theme) {
		this.foreachCell(function (item) {
			item.changeTheme(theme);
		});
	};

}

function Player(jquerydom, elementType) {
	'use strict';
	this.type = elementType;
	this.jquerydom = jquerydom;
	this.grow = function () {
		jquerydom.animate({
			opacity: 0.5
		}, 100).animate({
			opacity: 1
		}, 100);
	};
	this.hurt = function () {
		var curroffset = jquerydom.offset();
		var currcss = jquerydom.css("position");
		jquerydom.css({
			position: "absolute"
		});
		jquerydom.offset(curroffset);
		jquerydom.animate({
			left: "-=5px"
		}, 10);
		var i;
		for (i = 0; i < 5; i++) {
			jquerydom.animate({
				left: "+=10px"
			}, 10);
			jquerydom.animate({
				left: "-=10px"
			}, 10);
		}
		jquerydom.animate({
			left: "+=5px"
		}, 10, function () {
			jquerydom.css({
				position: currcss
			});
		});
	};
	this.severeHurt = function () {
		var curroffset = jquerydom.offset();
		var currcss = jquerydom.css("position");
		jquerydom.css({
			position: "absolute"
		});
		jquerydom.offset(curroffset);
		jquerydom.animate({
			left: "-=20px"
		}, 10);
		var i;
		for (i = 0; i < 5; i++) {
			jquerydom.animate({
				left: "+=40px"
			}, 10);
			jquerydom.animate({
				left: "-=40px"
			}, 10);
		}
		jquerydom.animate({
			left: "+=20px"
		}, 10, function () {
			jquerydom.css({
				position: currcss
			});
		});
	};
}




function GameContainer(map) {
	'use strict';
	this.map = map;
	this.enablePlay = function () {
		map.foreachCell(function (cell) {
			cell.fog.jquerydom.removeAttr("disabled");
			/*cell.fog.jquerydom.unbind("mousedown");
			cell.fog.jquerydom.removeClass("fog-static");*/
		});
	};
	this.disablePlay = function () {
		map.foreachCell(function (cell) {
			cell.fog.jquerydom.attr({disabled: "true"});
			/*cell.fog.jquerydom.mousedown(function () {
				cell.fog.jquerydom.toggleClass("fog-static");
			});*/
		});
	};
	var getFitOffset = function (player) {
		var offset = player.jquerydom.offset();
		offset.left += player.jquerydom.width() / 2;
		offset.top += player.jquerydom.height() / 2;
		return offset;
	}
	this.animatePlayerGrow = function (player, element, cellPos, callback) {
		var ele = new Element(element, cellPos, getFitOffset(player), function () {
			player.grow();
			if (callback != undefined) {
				callback();
			}
		});
	};
	this.animatePlayerHurt = function (player, element, cellPos, callback) {
		var ele = new Element(element, cellPos, getFitOffset(player), function () {
			player.hurt();
			if (callback != undefined) {
				callback();
			}
		});
	};
	this.animatePlayerSevereHurt = function (player, element, cellPos, callback) {
		var ele = new Element(element, cellPos, getFitOffset(player), function () {
			player.severeHurt();
			if (callback != undefined) {
				callback();
			}
		});
	};
	var getRandomMapOffset = function () {
		var offset = map.jquerydom.offset();
		var lft = Math.random() * map.jquerydom.width() * 0.7;
		offset.left += lft;
		var top = Math.random() * map.jquerydom.height() * 0.7;
		offset.top += top;
		return offset;
	};
	this.animatePlayerDistribute = function (player, element, cellPos, callback) {
		var ele = new Element(element, cellPos, getFitOffset(player), function () {
			var ele0 = new Element(player.type, getFitOffset(player), getRandomMapOffset());
			var ele1 = new Element(player.type, getFitOffset(player), getRandomMapOffset());
			var ele2 = new Element(player.type, getFitOffset(player), getRandomMapOffset(), callback);
		});
	};
}