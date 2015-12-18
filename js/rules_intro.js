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

});
