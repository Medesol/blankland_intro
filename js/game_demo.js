var staticElements = ["fire", "water", "wind", "land", "none"];
var staticPercentage = [0.2, 0.2, 0.2, 0.2, 0.2];

function getMapping(action, player, element) {
	'use strict';
	if (player.type === "fire") {
		if (element === "fire") {
			return action.grow;
		} else if (element === "water") {
			return action.severe;
		} else if (element === "wind") {
			return action.distribute;
		} else if (element === "land") {
			return action.hurt;
		}
	} else if (player.type === "water") {
		if (element === "fire") {
			return action.distribute;
		} else if (element === "water") {
			return action.grow;
		} else if (element === "wind") {
			return action.hurt;
		} else if (element === "land") {
			return action.severe;
		}
	} else if (player.type === "wind") {
		if (element === "fire") {
			return action.severe;
		} else if (element === "water") {
			return action.hurt;
		} else if (element === "wind") {
			return action.grow;
		} else if (element === "land") {
			return action.distribute;
		}
	} else if (player.type === "land") {
		if (element === "fire") {
			return action.hurt;
		} else if (element === "water") {
			return action.distribute;
		} else if (element === "wind") {
			return action.severe;
		} else if (element === "land") {
			return action.grow;
		}
	}
}


function MapData(map) {
	'use strict';
	var data = new Array();
	var percentSum = new Array();
	percentSum[0] = staticPercentage[0];
	var peri;
	for (peri = 1; peri < staticPercentage.length; peri++) {
		percentSum[peri] = percentSum[peri - 1] + staticPercentage[peri];
	}
	this.generate = function () {
		map.foreachCell(function (cell) {
			if (data[cell.row] === undefined) {
				data[cell.row] = new Array();
			}
			var rnd = Math.random();
			var i = 0;
			while (percentSum[i] < rnd) {
				i++;
			}
			data[cell.row][cell.column] = staticElements[i];
		});
	};

	this.get = function (row, column) {
		return data[row][column];
	};
}

function GameDemo(map,player,com1,com2,com3) {
	'use strict';
	var con = new GameContainer(map);
	var data = new MapData(map);
	var action = {
		grow: con.animatePlayerGrow,
		hurt: con.animatePlayerHurt,
		severe: con.animatePlayerSevereHurt,
		distribute: con.animatePlayerDistribute
	};
	//this.change


}