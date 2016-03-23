
$(document).ready(function () {
    moment.locale(locale);

    //only for de-locale
    (function updateTime() {
        var now = moment().format("LLLL");
        var lastSpaceIndex = now.lastIndexOf(" ");
        var date = now.substring(0, lastSpaceIndex);
        var clock = now.substring(lastSpaceIndex + 1);

        $(".clock").text(clock);
        $(".date").text(date);

        setTimeout(function () {
            updateTime();
        }, 1000);
    })();
});
