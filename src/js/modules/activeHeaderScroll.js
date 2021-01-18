function activeHeaderScroll() {

    let header = $('.header');
    _window.on('scroll load', function () {
        if (_window.scrollTop() >= 10) {
            header.addClass('header_scroll');
        } else {
            header.removeClass('header_scroll');
        }
    });

}