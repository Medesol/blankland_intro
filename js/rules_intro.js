$(function () {
    var playerGrow;
    var mapGrow;
    var conGrow;

    function initialGrow() {
        playerGrow = new Player($("#testplayerGrow"), "fire");
        mapGrow = new Map($(".game-container.grow"), 1, 1);
        mapGrow.get(0, 0).setNumber(0);
        conGrow = new GameContainer(mapGrow);
        mapGrow.changeTheme("fire");
        mapGrow.get(0, 0).setClickEvent(function (position) {
            conGrow.animatePlayerGrow(playerGrow, "fire", position, function () {
                mapGrow.jquerydom.html("");
                initialGrow();
            });
        });
    }
    initialGrow();


    var playerDistribute = new Player($("#testplayerDistribute"), "fire");
    var mapDistribute = new Map($(".game-container.distribute"), 3, 6);
    var conDistribute = new GameContainer(mapDistribute);
    var i1, j1;
    for (i1 = 0; i1 < 3; i1++) {
        for (j1 = 0; j1 < 6; j1++) {
            mapDistribute.get(i1, j1).fog.jquerydom.removeClass("fog");
            mapDistribute.get(i1, j1).fog.jquerydom.addClass("fog-static");
            mapDistribute.get(i1, j1).fog.whenOpen(function () {});
        }
    }
    $("#distribute").click(function () {
        conDistribute.animateDistribute(playerDistribute, "fire", playerDistribute.jquerydom.offset());
    });

    var mapshow;
    var flag;
    var water;

    function initial() {
        mapshow = new Map($(".game-container.show"), 2, 3);
        flag = 0;
        water = 0;
        $("#turn").text("点我");
        mapshow.get(0, 1).setNumber(2);
        mapshow.get(1, 0).setNumber(1);
        mapshow.get(1, 1).setNumber(2);
        mapshow.get(1, 2).setNumber(1);
        mapshow.get(0, 0).setClickEvent(function (position) {
            new Element("water", position, position,
                function () {
                    water++;
                    if (water == 2) {
                        mapshow.jquerydom.html("");
                        initial();
                    }
                });
            mapshow.get(0, 0).fog.disappear();
            mapshow.get(0, 0).number.showSelf();

        });
        mapshow.get(0, 2).setClickEvent(function (position) {
            new Element("water", position, position,
                function () {
                    water++;
                    if (water == 2) {
                        mapshow.jquerydom.html("");
                        initial();
                    }

                });
            mapshow.get(0, 2).fog.disappear();
            mapshow.get(0, 2).number.showSelf();
        });
    }
    initial();
    $("#turn").click(function () {
        if (flag == 0) {
            flag = 1;
            $("#turn").text("接着点我");
            mapshow.get(0, 1).fog.disappear();
            mapshow.get(0, 1).number.showSelf();
            mapshow.get(1, 0).fog.disappear();
            mapshow.get(1, 0).number.showSelf();
            mapshow.get(1, 1).fog.disappear();
            mapshow.get(1, 1).number.showSelf();
            mapshow.get(1, 2).fog.disappear();
            mapshow.get(1, 2).number.showSelf();
        } else {
            new Element("water", mapshow.get(0, 0).jquerydom.offset(), mapshow.get(0, 0).jquerydom.offset());
            mapshow.get(0, 0).fog.disappear();
            mapshow.get(0, 0).number.showSelf();
            new Element("water", mapshow.get(0, 2).jquerydom.offset(), mapshow.get(0, 2).jquerydom.offset(), function () {
                mapshow.jquerydom.html("");
                initial();
            });
            mapshow.get(0, 2).fog.disappear();
            mapshow.get(0, 2).number.showSelf();
        }

    });

    var mapExample;
    var num = new NumberSign(100, $("#testnum2"));
    var clickTime;
    var conExample;
    var playerExample;
    var i, j;

    function initialExample() {

        clickTime = 0;
        mapExample = new Map($(".game-container.Example"), 6, 7);
        for (i = 0; i < 6; i++) {
            for (j = 0; j < 7; j++) {
                if (!((i == 2) && (j == 1 || j == 2 || j == 3 || j == 4))) {
                    mapExample.get(i, j).fog.jquerydom.removeClass("fog");
                    mapExample.get(i, j).fog.jquerydom.addClass("fog-static");
                    mapExample.get(i, j).fog.whenOpen(function () {});
                }
            }
        }
        num = new NumberSign(1000, $("#testnum2"));
        playerExample = new Player($("#testplayerExample"), "fire");
        conExample = new GameContainer(mapExample);
        mapExample.get(2, 1).fog.jquerydom.addClass("fog-static-hover");
        mapExample.get(2, 2).fog.jquerydom.addClass("fog-static-hover");
        mapExample.get(2, 3).fog.jquerydom.addClass("fog-static-hover");
        mapExample.get(2, 4).fog.jquerydom.addClass("fog-static-hover");
        mapExample.get(2, 1).setClickEvent(function (position) {
            clickTime++;
            conExample.animatePlayerGrow(playerExample, "fire", position, function () {
                num.addNumber(55);
                if (clickTime == 4) {
                    mapExample.jquerydom.html("");
                    initialExample();
                }
            });
        });
        mapExample.get(2, 2).setClickEvent(function (position) {
            clickTime++;
            conExample.animatePlayerSevereHurt(playerExample, "water", position, function () {
                num.addNumber(-255);
                if (clickTime == 4) {
                    mapExample.jquerydom.html("");
                    initialExample();
                }
            });

        });
        mapExample.get(2, 3).setClickEvent(function (position) {
            clickTime++;
            conExample.animatePlayerHurt(playerExample, "land", position, function () {
                num.addNumber(-85);
                if (clickTime == 4) {
                    mapExample.jquerydom.html("");
                    initialExample();
                }
            });
        });
        mapExample.get(2, 4).setClickEvent(function (position) {
            clickTime++;
            conExample.animatePlayerDistribute(playerExample, "wind", position, function () {
                if (clickTime == 4) {
                    mapExample.jquerydom.html("");
                    initialExample();
                }
            });
        });
    }
    initialExample();
});
