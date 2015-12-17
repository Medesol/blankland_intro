$(function () {
    var numindex = location.search.lastIndexOf("?") + 1;
    if (numindex > 0 && numindex < location.search.length) {
        var carid = location.search.substring(numindex);
        $(".protocol-" + carid).addClass("active");
    } else {
        $(".default-protocol").addClass("active");
    }
});