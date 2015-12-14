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
    this.jquerydom.html("<div></div>");
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
        eledom.delay(200).animate(towards, 1000).fadeOut(1000, function () {
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
}

