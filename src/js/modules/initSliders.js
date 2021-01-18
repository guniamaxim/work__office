function initSliders() {
    new Swiper('.banner__slider__container', {
        slidesPerView: 1,
        speed: 400,
        spaceBetween: 29,
        // noSwiping,
        loop: true,
        navigation: {
            nextEl: '.banner__button-next',
            prevEl: '.banner__button-prev',
        },
        pagination: {
            el: '.swiper-pagination.banner__pagination',
            clickable: true,
        },
    });
}