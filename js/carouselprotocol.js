$(function () {
    var numindex = location.search.lastIndexOf("?") + 1;
    if (numindex > 0 && numindex < location.search.length) {
        var carid = parseInt(location.search.substring(numindex));
        setTimeout(function () {
            $(".remote-carousel").carousel(carid);
        }, 300);

    }
});
