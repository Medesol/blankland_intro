function Fog(jquerydom) {
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
    }
}

function NumberSign(number, jquerydom) {
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

function Element(elementType,position) {
    var eledom = $("<div class='element'></div>");
    eledom.addClass("cell-" + elementType);
    eledom.appendTo("#out");
    eledom.offset(position);
    eledom.show();
    eledom.fadeIn(500,function () {
        eledom.delay(500).fadeOut(500);
    });
    eledom.remove();
}

function Cell(jquerydom, elementType, number) {
    this.jquerydom = jquerydom;
    jquerydom.html("<div class='cell number'></div><button class='cell fog' type='button'></button>");
    var fogDom = jquerydom.children(".fog");
    var fog = new Fog(fogDom);
    var numberDom = jquerydom.children(".number");
    var number = new NumberSign(0, numberDom);
    this.getLeft = function () {
        return jquerydom.offset().left;
    }
    this.getTop = function () {
        return jquerydom.offset().top;
    }
    number.disappear();
    fog.whenOpen(function () {
        fog.disappear();
        var ele = new Element(elementType,jquerydom.offset());
        number.showSelf();
    });

}