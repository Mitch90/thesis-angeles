$(function () {
    // instantiate the scrollama
    const scroller = scrollama();

    // setup the instance, pass callback functions
    scroller
        .setup({
            step: ".context__text h2",
            offset: 0.2
        })
        .onStepEnter(handleStepEnter)
        .onStepExit(handleStepExit);

    $(window).on("resize", function() {
        scroller.resize();
    });

    let $sideLinks = $(".context__side a");
    // Add smooth scrolling on all links inside the sidelist
    $sideLinks.on("click", function (event) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            let target = $(this.hash);
            target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html,body").animate({
                    scrollTop: target.offset().top - 155
                }, 1000);
                return false;
            }
        }
    });
});

function handleStepEnter(intersection) {
    let $active = $(".side__container li:nth-child(" + (intersection.index + 1) + ")");
    $(".side__container li").removeClass("title--active");
    $active.addClass("title--active");
}

function handleStepExit(intersection) {
    if (intersection.direction == "up") {
        let $active = $(".side__container li:nth-child(" + (intersection.index) + ")");
        $(".side__container li").removeClass("title--active");
        $active.addClass("title--active");
    }
}