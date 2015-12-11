function Cell() {

}



function Fog(jquerydom) {
    this.jquerydom = jquerydom;
    this.isVisible = function () {
        return !this.jquerydom.hasClass("disappear");
    };
    this.disappear = function () {
        this.jquerydom.addClass("disappear");
    };
    this.showSelf = function () {
        this.jquerydom.removeClass("disappear");
    };
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