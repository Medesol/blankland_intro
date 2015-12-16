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
	this.set = function (row, column, value) {
		data[row][column] = value;
	};
	this.calcNum = function (player, row, column) {
		var action = {
			grow: 0,
			hurt: 1,
			severe: 1,
			distribute: 0
		};
		var count = function (i, j) {
			if (i >= 0 && j >= 0 && data !== undefined && data[i] !== undefined && data[i][j] !== undefined && data[i][j] !== "none" && data[i][j] !== "picked") {
				return getMapping(action, player, data[i][j]);
			}
			return 0;
		}
		var counter = 0;
		counter += count(row - 1, column - 1);
		counter += count(row - 1, column);
		counter += count(row - 1, column + 1);
		counter += count(row, column - 1);
		counter += count(row, column + 1);
		counter += count(row + 1, column - 1);
		counter += count(row + 1, column);
		counter += count(row + 1, column + 1);
		return counter;
	};
}

var characterAttribute = {
	fire: {
		grow: 55,
		hurt: 85,
		severe: 85 * 3,
		distribute: {
			cost: 30,
			inmap: 3
		}
	},
	water: {
		grow: 48,
		hurt: 40,
		severe: 40 * 3,
		distribute: {
			cost: 40,
			inmap: 3
		}
	},
	wind: {
		grow: 42,
		hurt: 55,
		severe: 100,
		distribute: {
			cost: 20,
			inmap: 3
		}
	},
	land: {
		grow: 45,
		hurt: 55,
		severe: 100,
		distribute: {
			cost: 70,
			inmap: 3
		}
	}
};

function GameDemo(map, player, com1, com2, com3) {
	'use strict';
	player.isPlayer = true;
	com1.isPlayer = true;
	com2.isPlayer = true;
	com3.isPlayer = true;
	this.loadNumberSign = function (currplayer, numjquerydom) {
		currplayer.numberSign = new NumberSign(10000, numjquerydom);
	};
	var nextPlayer = function (p) {
		if (p.type == player.type) {
			return com1;
		} else if (p.type == com1.type) {
			return com2;
		} else if (p.type == com2.type) {
			return com3;
		} else {
			return player;
		}
	};
	var con = new GameContainer(map);
	var data = new MapData(map);
	var distributeCall = function (character) {
		var successCount = 0;
		//TODO: finish logic of put elements in maps. 
		// Put elements in empty cells which are not picked. 
	};
	var action = {
		grow: function (character, ele, pos) {
			con.animatePlayerGrow(character, ele, pos, function () {
				character.numberSign.addNumber(characterAttribute[character.type].grow);
			});
		},
		hurt: function (character, ele, pos) {
			con.animatePlayerHurt(character, ele, pos, function () {
				character.numberSign.addNumber(-characterAttribute[character.type].hurt);
			});
		},
		severe: function (character, ele, pos) {
			con.animatePlayerSevereHurt(character, ele, pos, function () {
				character.numberSign.addNumber(-characterAttribute[character.type].severe);
			});
		},
		distribute: function (character, ele, pos) {
			con.animatePlayerDistribute(character, ele, pos);
			distributeCall(character);
		}
	};
	var onComplete;
	var cgView = function (character) {
		if (character.isPlayer === true) {
			con.enablePlay();
		} else {
			con.disablePlay();
		}
		map.foreachCell(function (cell) {
			cell.number.setNumber(data.calcNum(character, cell.row, cell.column));
			cell.changeTheme(character.type);
			cell.setClickEvent(function (pos) {
				var ele = data.get(cell.row, cell.column);
				if (ele !== "none") {
					var todo = getMapping(action, character, ele);
					todo(character, ele, pos);				
				}
				data.set(cell.row,cell.column,"picked");
				onComplete(character);
			});
		});
	};
	this.changeView = cgView;
	onComplete = function (ch) {
		cgView(nextPlayer(ch));
	};
	this.initialize = function () {
		data.generate();
		// TODO: finish initialization of the game.
	};
	//TODO: finish distribution of player click.


}