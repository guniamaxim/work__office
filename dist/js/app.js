let _window = $(window);
let _document = $(document);

$(document).ready(function () {

    function pageReady() {
        // вспомогательные скрипты, библиотеки
        legacySupport();
        imgToSvg();
        formSend();
        // activeHeaderScroll();
        // инициализация библиотек
        initSliders();
        initPopups();
        initMasks();
        // initSelectric();
        initLazyPicture();
        // кастомные скрипты
        burgerMenu();
        scrollTop();
        sectionNavigation();
        // headerHeightFun();
        // vhModule();
        // inputNumber();
    }

    pageReady();

    window.addEventListener('resize', () => {
        // headerHeightFun();
    })

});
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
function burgerMenu() {

    let burger = $('.burger');
    let menu = $('.burger-slide-content');

    $(document).mouseup(function (e) {

        if (burger.is(e.target) || burger.has(e.target).length === 1) {
            if (menu.hasClass('active')) {
                menu.removeClass('active');
                burger.removeClass('active');
            } else {
                menu.addClass('active');
                burger.addClass('active');
            }
        } else if (!menu.is(e.target) && menu.has(e.target).length === 0 && menu.hasClass('active')) {
            menu.removeClass('active');
            burger.removeClass('active');
        }

    });

}
function customFadeIn(elem, displayValue, msEffect) {
    // проверяем значение свойства display
    if(getComputedStyle(elem).display == 'none') {
        
        // проверка переданных значений
        if(!displayValue) displayValue = 'block';
        if(!msEffect) {
            msEffect = 0.4;
        } else {
            msEffect /= 1000;
        }

        // запускаем анимацию
        elem.style.cssText = `
            transition: opacity ${msEffect}s;
            display: ${displayValue};
            opacity: 0;
        `;
        setTimeout(() => elem.style.opacity = 1);

        elem.addEventListener('transitionend', function(){
            elem.setAttribute('style', '');
            elem.style.display = displayValue;
        });

    }

}
function customFadeOut(elem, msEffect) {
    // проверяем значение свойства display
    if(getComputedStyle(elem).display != 'none') {
        // проверка переданных значений
        if(!msEffect) {
            msEffect = 0.4;
        } else {
            msEffect /= 1000;
        }

        // запускаем анимацию
        elem.style.cssText = `
            transition: opacity ${msEffect}s;
            opacity: 1;
        `;
        setTimeout(() => elem.style.opacity = 0);

        elem.addEventListener('transitionend', function(){
            elem.setAttribute('style', '');
            elem.style.display = 'none';
        });
    }

}
function customFadeToggle(elem, displayValue, msEffect) {
    // проверяем значение свойства display на block или flex
    if(getComputedStyle(elem).display == 'block' || getComputedStyle(elem).display == 'flex') {
         customFadeOut(elem, msEffect);
    } // если display: none
    else  { 
        customFadeIn(elem, displayValue, msEffect);
    }
}
function customSlideDown(elem, displayValue, msEffect) {

    // проверяем значение свойства display
    if(getComputedStyle(elem).display == 'block' || getComputedStyle(elem).display == 'flex') {
        return;
    }

    // проверка переданных значений
    if(!displayValue) displayValue = 'block';
    if(!msEffect) {
        msEffect = 0.4;
    } else {
        msEffect /= 1000;
    }


    // узнаем высоту скрытого элемента
    elem.style.cssText = `
        opacity: 0;
        position: absolute;
        z-index: -2;
        display: ${displayValue};
    `;
    let heightElem = getComputedStyle(elem).height
    elem.setAttribute('style', '');

    // запускаем анимацию
    elem.style.cssText = `
        transition: height ${msEffect}s;
        overflow: hidden;
        height: 0;
        display: ${displayValue};
    `;
    setTimeout(() => elem.style.height = heightElem);

    elem.addEventListener('transitionend', function(){
        elem.setAttribute('style', '');
        elem.style.display = displayValue;
    });

}
function customSlideToggle(elem, displayValue, msEffect) {
    // проверяем значение свойства display на block или flex
    if(getComputedStyle(elem).display == 'block' || getComputedStyle(elem).display == 'flex') {
        customSlideUp(elem, msEffect);
    }
    // если display: none
    else {
        customSlideDown(elem, displayValue, msEffect);
    }

}
function customSlideUp(elem, msEffect) {
    // проверяем значение свойства display
    if(getComputedStyle(elem).display == 'block' || getComputedStyle(elem).display == 'flex') {
        // проверка переданных значений
        if(!msEffect) {
            msEffect = 0.4;
        } else {
            msEffect /= 1000;
        }

        let heightElem = getComputedStyle(elem).height

        // запускаем анимацию
        elem.style.cssText = `
            transition: height ${msEffect}s;
            overflow: hidden;
            height: ${heightElem};
            display: ${getComputedStyle(elem).display};
        `;
        setTimeout(() => elem.style.height = 0);

        elem.addEventListener('transitionend', function(){
            elem.setAttribute('style', '');
            elem.style.display = 'none';
        });
    }
}
function formSend() {
    document.addEventListener('wpcf7mailsent', function (event) {
        let el = $('#modal-form-tnx');
        if (el.length) {
            $.magnificPopup.open({
                items: {
                    src: el
                },
                type: 'inline',
                fixedContentPos: true,
                fixedBgPos: true,
                overflowY: 'auto',
                closeBtnInside: true,
                preloader: false,
                midClick: true,
                removalDelay: 300,
                mainClass: 'popup-buble',
            });
        }
    }, false);
}
function getElIndex(el) {
    for (var i = 0; el = el.previousElementSibling; i++);
    return i;
}
function headerHeightFun() {
    let headerHeight = document.querySelector('.header').offsetHeight;
    document.documentElement.style.setProperty('--headerHeight', `${headerHeight}px`);
}
function imgToSvg() {
    $('img.svg').each(function () {
        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        $.get(imgURL, function (data) {
            var $svg = $(data).find('svg');
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }
            $svg = $svg.removeAttr('xmlns:a');
            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }
            $img.replaceWith($svg);
        }, 'xml');
    });
}
function initLazyPicture() {
    $('.lazy').lazy({
        effect: 'fadeIn',
        effectTime: 200
    });
}
function initMasks() {
    //$(".js-dateMask").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"});
    $("input[type='tel']").mask("+7 (000) 000-0000");
}
function initPopups() {

    // Magnific Popup
    let startWindowScroll = 0;
    $('.js-popup').magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'popup-buble',
        callbacks: {
            beforeOpen: function () {
                startWindowScroll = _window.scrollTop();
            },
            close: function () {
                _window.scrollTop(startWindowScroll);
            }
        }
    });

    // $.magnificPopup.close();

}
function initSelectric() {
    $('select').selectric({
        maxHeight: 300,
        arrowButtonMarkup: '<b class="button"></b>',

        onInit: function (element, data) {
            var $elm = $(element),
                $wrapper = $elm.closest('.' + data.classes.wrapper);

            $wrapper.find('.label').html($elm.attr('placeholder'));
        },
        onBeforeOpen: function (element, data) {
            var $elm = $(element),
                $wrapper = $elm.closest('.' + data.classes.wrapper);

            $wrapper.find('.label').data('value', $wrapper.find('.label').html()).html($elm.attr('placeholder'));
        },
        onBeforeClose: function (element, data) {
            var $elm = $(element),
                $wrapper = $elm.closest('.' + data.classes.wrapper);

            $wrapper.find('.label').html($wrapper.find('.label').data('value'));
        }
    });
}
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
function inputNumber() {

    let plusInputNumber = document.querySelectorAll('.input-counter__plus');
    let minusInputNumber = document.querySelectorAll('.input-counter__minus');

    let classWrapInputNumber = '.input-counter';
    let classInputNumber = '.input-counter__input';

    plusInputNumber.forEach(current => {
        increment_decrement(current, 'plus');
    });

    minusInputNumber.forEach(current => {
        increment_decrement(current, 'minus');
    });

    function increment_decrement(current, sign) {
        current.addEventListener('click', function(){
            
            let thisWrap = current.closest(classWrapInputNumber);
            let thisInput = thisWrap.querySelector(classInputNumber);

            if(sign == 'plus') {
                thisInput.value++;
            }

            if(sign == 'minus' && thisInput.value > 1) {
                thisInput.value--;
            }

        });
    }

}
function legacySupport() {
    svg4everybody();
}
function scrollTop() {
    _window.scroll(function () {
        if ($(this).scrollTop() > 250) {
            $('#back-top').fadeIn(300);
        } else {
            $('#back-top').fadeOut(300);
        }
    });

    $('#back-top').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 750);
        return false;
    });
}
function sectionNavigation() {
    _document
        .on('click', '[href="#"]', function (e) {
            e.preventDefault();
        })
        .on('click', 'a[href^="#section"]', function () {
            let el = $(this).attr('href');
            $('body, html').animate({
                scrollTop: $(el).offset().top
            }, 1000);
            return false;
        })
}
function vhModule() {

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    // headerHeightFun();
    });

}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFjdGl2ZUhlYWRlclNjcm9sbC5qcyIsImJ1cmdlck1lbnUuanMiLCJjdXN0b21GYWRlSW4uanMiLCJjdXN0b21GYWRlT3V0LmpzIiwiY3VzdG9tRmFkZVRvZ2dsZS5qcyIsImN1c3RvbVNsaWRlRG93bi5qcyIsImN1c3RvbVNsaWRlVG9nZ2xlLmpzIiwiY3VzdG9tU2xpZGVVcC5qcyIsImZvcm1TZW5kLmpzIiwiZ2V0RWxJbmRleC5qcyIsImhlYWRlckhlaWdodEZ1bi5qcyIsImltZ1RvU3ZnLmpzIiwiaW5pdExhenlQaWN0dXJlLmpzIiwiaW5pdE1hc2tzLmpzIiwiaW5pdFBvcHVwcy5qcyIsImluaXRTZWxlY3RyaWMuanMiLCJpbml0U2xpZGVycy5qcyIsImlucHV0TnVtYmVyLmpzIiwibGVnYWN5U3VwcG9ydC5qcyIsInNjcm9sbFRvcC5qcyIsInNlY3Rpb25OYXZpZ2F0aW9uLmpzIiwidmhNb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pDQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IF93aW5kb3cgPSAkKHdpbmRvdyk7XG5sZXQgX2RvY3VtZW50ID0gJChkb2N1bWVudCk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICAgIGZ1bmN0aW9uIHBhZ2VSZWFkeSgpIHtcbiAgICAgICAgLy8g0LLRgdC/0L7QvNC+0LPQsNGC0LXQu9GM0L3Ri9C1INGB0LrRgNC40L/RgtGLLCDQsdC40LHQu9C40L7RgtC10LrQuFxuICAgICAgICBsZWdhY3lTdXBwb3J0KCk7XG4gICAgICAgIGltZ1RvU3ZnKCk7XG4gICAgICAgIGZvcm1TZW5kKCk7XG4gICAgICAgIC8vIGFjdGl2ZUhlYWRlclNjcm9sbCgpO1xuICAgICAgICAvLyDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQsdC40LHQu9C40L7RgtC10LpcbiAgICAgICAgaW5pdFNsaWRlcnMoKTtcbiAgICAgICAgaW5pdFBvcHVwcygpO1xuICAgICAgICBpbml0TWFza3MoKTtcbiAgICAgICAgLy8gaW5pdFNlbGVjdHJpYygpO1xuICAgICAgICBpbml0TGF6eVBpY3R1cmUoKTtcbiAgICAgICAgLy8g0LrQsNGB0YLQvtC80L3Ri9C1INGB0LrRgNC40L/RgtGLXG4gICAgICAgIGJ1cmdlck1lbnUoKTtcbiAgICAgICAgc2Nyb2xsVG9wKCk7XG4gICAgICAgIHNlY3Rpb25OYXZpZ2F0aW9uKCk7XG4gICAgICAgIC8vIGhlYWRlckhlaWdodEZ1bigpO1xuICAgICAgICAvLyB2aE1vZHVsZSgpO1xuICAgICAgICAvLyBpbnB1dE51bWJlcigpO1xuICAgIH1cblxuICAgIHBhZ2VSZWFkeSgpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgICAgLy8gaGVhZGVySGVpZ2h0RnVuKCk7XG4gICAgfSlcblxufSk7IiwiZnVuY3Rpb24gYWN0aXZlSGVhZGVyU2Nyb2xsKCkge1xyXG5cclxuICAgIGxldCBoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XHJcbiAgICBfd2luZG93Lm9uKCdzY3JvbGwgbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoX3dpbmRvdy5zY3JvbGxUb3AoKSA+PSAxMCkge1xyXG4gICAgICAgICAgICBoZWFkZXIuYWRkQ2xhc3MoJ2hlYWRlcl9zY3JvbGwnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBoZWFkZXIucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9zY3JvbGwnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn0iLCJmdW5jdGlvbiBidXJnZXJNZW51KCkge1xyXG5cclxuICAgIGxldCBidXJnZXIgPSAkKCcuYnVyZ2VyJyk7XHJcbiAgICBsZXQgbWVudSA9ICQoJy5idXJnZXItc2xpZGUtY29udGVudCcpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm1vdXNldXAoZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgaWYgKGJ1cmdlci5pcyhlLnRhcmdldCkgfHwgYnVyZ2VyLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIGlmIChtZW51Lmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgbWVudS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBidXJnZXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWVudS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBidXJnZXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICghbWVudS5pcyhlLnRhcmdldCkgJiYgbWVudS5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCAmJiBtZW51Lmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICBtZW51LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgYnVyZ2VyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG59IiwiZnVuY3Rpb24gY3VzdG9tRmFkZUluKGVsZW0sIGRpc3BsYXlWYWx1ZSwgbXNFZmZlY3QpIHtcclxuICAgIC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQt9C90LDRh9C10L3QuNC1INGB0LLQvtC50YHRgtCy0LAgZGlzcGxheVxyXG4gICAgaWYoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKS5kaXNwbGF5ID09ICdub25lJykge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vINC/0YDQvtCy0LXRgNC60LAg0L/QtdGA0LXQtNCw0L3QvdGL0YUg0LfQvdCw0YfQtdC90LjQuVxyXG4gICAgICAgIGlmKCFkaXNwbGF5VmFsdWUpIGRpc3BsYXlWYWx1ZSA9ICdibG9jayc7XHJcbiAgICAgICAgaWYoIW1zRWZmZWN0KSB7XHJcbiAgICAgICAgICAgIG1zRWZmZWN0ID0gMC40O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1zRWZmZWN0IC89IDEwMDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQt9Cw0L/Rg9GB0LrQsNC10Lwg0LDQvdC40LzQsNGG0LjRjlxyXG4gICAgICAgIGVsZW0uc3R5bGUuY3NzVGV4dCA9IGBcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAke21zRWZmZWN0fXM7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICR7ZGlzcGxheVZhbHVlfTtcclxuICAgICAgICAgICAgb3BhY2l0eTogMDtcclxuICAgICAgICBgO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZWxlbS5zdHlsZS5vcGFjaXR5ID0gMSk7XHJcblxyXG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcclxuICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheVZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbn0iLCJmdW5jdGlvbiBjdXN0b21GYWRlT3V0KGVsZW0sIG1zRWZmZWN0KSB7XHJcbiAgICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0LfQvdCw0YfQtdC90LjQtSDRgdCy0L7QudGB0YLQstCwIGRpc3BsYXlcclxuICAgIGlmKGdldENvbXB1dGVkU3R5bGUoZWxlbSkuZGlzcGxheSAhPSAnbm9uZScpIHtcclxuICAgICAgICAvLyDQv9GA0L7QstC10YDQutCwINC/0LXRgNC10LTQsNC90L3Ri9GFINC30L3QsNGH0LXQvdC40LlcclxuICAgICAgICBpZighbXNFZmZlY3QpIHtcclxuICAgICAgICAgICAgbXNFZmZlY3QgPSAwLjQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbXNFZmZlY3QgLz0gMTAwMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINC30LDQv9GD0YHQutCw0LXQvCDQsNC90LjQvNCw0YbQuNGOXHJcbiAgICAgICAgZWxlbS5zdHlsZS5jc3NUZXh0ID0gYFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5ICR7bXNFZmZlY3R9cztcclxuICAgICAgICAgICAgb3BhY2l0eTogMTtcclxuICAgICAgICBgO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZWxlbS5zdHlsZS5vcGFjaXR5ID0gMCk7XHJcblxyXG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcclxuICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufSIsImZ1bmN0aW9uIGN1c3RvbUZhZGVUb2dnbGUoZWxlbSwgZGlzcGxheVZhbHVlLCBtc0VmZmVjdCkge1xyXG4gICAgLy8g0L/RgNC+0LLQtdGA0Y/QtdC8INC30L3QsNGH0LXQvdC40LUg0YHQstC+0LnRgdGC0LLQsCBkaXNwbGF5INC90LAgYmxvY2sg0LjQu9C4IGZsZXhcclxuICAgIGlmKGdldENvbXB1dGVkU3R5bGUoZWxlbSkuZGlzcGxheSA9PSAnYmxvY2snIHx8IGdldENvbXB1dGVkU3R5bGUoZWxlbSkuZGlzcGxheSA9PSAnZmxleCcpIHtcclxuICAgICAgICAgY3VzdG9tRmFkZU91dChlbGVtLCBtc0VmZmVjdCk7XHJcbiAgICB9IC8vINC10YHQu9C4IGRpc3BsYXk6IG5vbmVcclxuICAgIGVsc2UgIHsgXHJcbiAgICAgICAgY3VzdG9tRmFkZUluKGVsZW0sIGRpc3BsYXlWYWx1ZSwgbXNFZmZlY3QpO1xyXG4gICAgfVxyXG59IiwiZnVuY3Rpb24gY3VzdG9tU2xpZGVEb3duKGVsZW0sIGRpc3BsYXlWYWx1ZSwgbXNFZmZlY3QpIHtcclxuXHJcbiAgICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0LfQvdCw0YfQtdC90LjQtSDRgdCy0L7QudGB0YLQstCwIGRpc3BsYXlcclxuICAgIGlmKGdldENvbXB1dGVkU3R5bGUoZWxlbSkuZGlzcGxheSA9PSAnYmxvY2snIHx8IGdldENvbXB1dGVkU3R5bGUoZWxlbSkuZGlzcGxheSA9PSAnZmxleCcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0L/RgNC+0LLQtdGA0LrQsCDQv9C10YDQtdC00LDQvdC90YvRhSDQt9C90LDRh9C10L3QuNC5XHJcbiAgICBpZighZGlzcGxheVZhbHVlKSBkaXNwbGF5VmFsdWUgPSAnYmxvY2snO1xyXG4gICAgaWYoIW1zRWZmZWN0KSB7XHJcbiAgICAgICAgbXNFZmZlY3QgPSAwLjQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1zRWZmZWN0IC89IDEwMDA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vINGD0LfQvdCw0LXQvCDQstGL0YHQvtGC0YMg0YHQutGA0YvRgtC+0LPQviDRjdC70LXQvNC10L3RgtCwXHJcbiAgICBlbGVtLnN0eWxlLmNzc1RleHQgPSBgXHJcbiAgICAgICAgb3BhY2l0eTogMDtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgei1pbmRleDogLTI7XHJcbiAgICAgICAgZGlzcGxheTogJHtkaXNwbGF5VmFsdWV9O1xyXG4gICAgYDtcclxuICAgIGxldCBoZWlnaHRFbGVtID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKS5oZWlnaHRcclxuICAgIGVsZW0uc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcclxuXHJcbiAgICAvLyDQt9Cw0L/Rg9GB0LrQsNC10Lwg0LDQvdC40LzQsNGG0LjRjlxyXG4gICAgZWxlbS5zdHlsZS5jc3NUZXh0ID0gYFxyXG4gICAgICAgIHRyYW5zaXRpb246IGhlaWdodCAke21zRWZmZWN0fXM7XHJcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICBoZWlnaHQ6IDA7XHJcbiAgICAgICAgZGlzcGxheTogJHtkaXNwbGF5VmFsdWV9O1xyXG4gICAgYDtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4gZWxlbS5zdHlsZS5oZWlnaHQgPSBoZWlnaHRFbGVtKTtcclxuXHJcbiAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcclxuICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5VmFsdWU7XHJcbiAgICB9KTtcclxuXHJcbn0iLCJmdW5jdGlvbiBjdXN0b21TbGlkZVRvZ2dsZShlbGVtLCBkaXNwbGF5VmFsdWUsIG1zRWZmZWN0KSB7XHJcbiAgICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0LfQvdCw0YfQtdC90LjQtSDRgdCy0L7QudGB0YLQstCwIGRpc3BsYXkg0L3QsCBibG9jayDQuNC70LggZmxleFxyXG4gICAgaWYoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKS5kaXNwbGF5ID09ICdibG9jaycgfHwgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKS5kaXNwbGF5ID09ICdmbGV4Jykge1xyXG4gICAgICAgIGN1c3RvbVNsaWRlVXAoZWxlbSwgbXNFZmZlY3QpO1xyXG4gICAgfVxyXG4gICAgLy8g0LXRgdC70LggZGlzcGxheTogbm9uZVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY3VzdG9tU2xpZGVEb3duKGVsZW0sIGRpc3BsYXlWYWx1ZSwgbXNFZmZlY3QpO1xyXG4gICAgfVxyXG5cclxufSIsImZ1bmN0aW9uIGN1c3RvbVNsaWRlVXAoZWxlbSwgbXNFZmZlY3QpIHtcclxuICAgIC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQt9C90LDRh9C10L3QuNC1INGB0LLQvtC50YHRgtCy0LAgZGlzcGxheVxyXG4gICAgaWYoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKS5kaXNwbGF5ID09ICdibG9jaycgfHwgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKS5kaXNwbGF5ID09ICdmbGV4Jykge1xyXG4gICAgICAgIC8vINC/0YDQvtCy0LXRgNC60LAg0L/QtdGA0LXQtNCw0L3QvdGL0YUg0LfQvdCw0YfQtdC90LjQuVxyXG4gICAgICAgIGlmKCFtc0VmZmVjdCkge1xyXG4gICAgICAgICAgICBtc0VmZmVjdCA9IDAuNDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtc0VmZmVjdCAvPSAxMDAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGhlaWdodEVsZW0gPSBnZXRDb21wdXRlZFN0eWxlKGVsZW0pLmhlaWdodFxyXG5cclxuICAgICAgICAvLyDQt9Cw0L/Rg9GB0LrQsNC10Lwg0LDQvdC40LzQsNGG0LjRjlxyXG4gICAgICAgIGVsZW0uc3R5bGUuY3NzVGV4dCA9IGBcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjogaGVpZ2h0ICR7bXNFZmZlY3R9cztcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICAgICAgaGVpZ2h0OiAke2hlaWdodEVsZW19O1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAke2dldENvbXB1dGVkU3R5bGUoZWxlbSkuZGlzcGxheX07XHJcbiAgICAgICAgYDtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGVsZW0uc3R5bGUuaGVpZ2h0ID0gMCk7XHJcblxyXG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcclxuICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiZnVuY3Rpb24gZm9ybVNlbmQoKSB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3cGNmN21haWxzZW50JywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IGVsID0gJCgnI21vZGFsLWZvcm0tdG54Jyk7XHJcbiAgICAgICAgaWYgKGVsLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkLm1hZ25pZmljUG9wdXAub3Blbih7XHJcbiAgICAgICAgICAgICAgICBpdGVtczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYzogZWxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW5saW5lJyxcclxuICAgICAgICAgICAgICAgIGZpeGVkQ29udGVudFBvczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGZpeGVkQmdQb3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgIGNsb3NlQnRuSW5zaWRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcHJlbG9hZGVyOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG1pZENsaWNrOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcmVtb3ZhbERlbGF5OiAzMDAsXHJcbiAgICAgICAgICAgICAgICBtYWluQ2xhc3M6ICdwb3B1cC1idWJsZScsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sIGZhbHNlKTtcclxufSIsImZ1bmN0aW9uIGdldEVsSW5kZXgoZWwpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBlbCA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7IGkrKyk7XHJcbiAgICByZXR1cm4gaTtcclxufSIsImZ1bmN0aW9uIGhlYWRlckhlaWdodEZ1bigpIHtcclxuICAgIGxldCBoZWFkZXJIZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJykub2Zmc2V0SGVpZ2h0O1xyXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWhlYWRlckhlaWdodCcsIGAke2hlYWRlckhlaWdodH1weGApO1xyXG59IiwiZnVuY3Rpb24gaW1nVG9TdmcoKSB7XHJcbiAgICAkKCdpbWcuc3ZnJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyICRpbWcgPSAkKHRoaXMpO1xyXG4gICAgICAgIHZhciBpbWdJRCA9ICRpbWcuYXR0cignaWQnKTtcclxuICAgICAgICB2YXIgaW1nQ2xhc3MgPSAkaW1nLmF0dHIoJ2NsYXNzJyk7XHJcbiAgICAgICAgdmFyIGltZ1VSTCA9ICRpbWcuYXR0cignc3JjJyk7XHJcblxyXG4gICAgICAgICQuZ2V0KGltZ1VSTCwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyICRzdmcgPSAkKGRhdGEpLmZpbmQoJ3N2ZycpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGltZ0lEICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgJHN2ZyA9ICRzdmcuYXR0cignaWQnLCBpbWdJRCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbWdDbGFzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2NsYXNzJywgaW1nQ2xhc3MgKyAnIHJlcGxhY2VkLXN2ZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRzdmcgPSAkc3ZnLnJlbW92ZUF0dHIoJ3htbG5zOmEnKTtcclxuICAgICAgICAgICAgaWYgKCEkc3ZnLmF0dHIoJ3ZpZXdCb3gnKSAmJiAkc3ZnLmF0dHIoJ2hlaWdodCcpICYmICRzdmcuYXR0cignd2lkdGgnKSkge1xyXG4gICAgICAgICAgICAgICAgJHN2Zy5hdHRyKCd2aWV3Qm94JywgJzAgMCAnICsgJHN2Zy5hdHRyKCdoZWlnaHQnKSArICcgJyArICRzdmcuYXR0cignd2lkdGgnKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkaW1nLnJlcGxhY2VXaXRoKCRzdmcpO1xyXG4gICAgICAgIH0sICd4bWwnKTtcclxuICAgIH0pO1xyXG59IiwiZnVuY3Rpb24gaW5pdExhenlQaWN0dXJlKCkge1xyXG4gICAgJCgnLmxhenknKS5sYXp5KHtcclxuICAgICAgICBlZmZlY3Q6ICdmYWRlSW4nLFxyXG4gICAgICAgIGVmZmVjdFRpbWU6IDIwMFxyXG4gICAgfSk7XHJcbn0iLCJmdW5jdGlvbiBpbml0TWFza3MoKSB7XHJcbiAgICAvLyQoXCIuanMtZGF0ZU1hc2tcIikubWFzayhcIjk5Ljk5Ljk5XCIse3BsYWNlaG9sZGVyOlwi0JTQlC7QnNCcLtCT0JNcIn0pO1xyXG4gICAgJChcImlucHV0W3R5cGU9J3RlbCddXCIpLm1hc2soXCIrNyAoMDAwKSAwMDAtMDAwMFwiKTtcclxufSIsImZ1bmN0aW9uIGluaXRQb3B1cHMoKSB7XHJcblxyXG4gICAgLy8gTWFnbmlmaWMgUG9wdXBcclxuICAgIGxldCBzdGFydFdpbmRvd1Njcm9sbCA9IDA7XHJcbiAgICAkKCcuanMtcG9wdXAnKS5tYWduaWZpY1BvcHVwKHtcclxuICAgICAgICB0eXBlOiAnaW5saW5lJyxcclxuICAgICAgICBmaXhlZENvbnRlbnRQb3M6IHRydWUsXHJcbiAgICAgICAgZml4ZWRCZ1BvczogdHJ1ZSxcclxuICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcclxuICAgICAgICBjbG9zZUJ0bkluc2lkZTogdHJ1ZSxcclxuICAgICAgICBwcmVsb2FkZXI6IGZhbHNlLFxyXG4gICAgICAgIG1pZENsaWNrOiB0cnVlLFxyXG4gICAgICAgIHJlbW92YWxEZWxheTogMzAwLFxyXG4gICAgICAgIG1haW5DbGFzczogJ3BvcHVwLWJ1YmxlJyxcclxuICAgICAgICBjYWxsYmFja3M6IHtcclxuICAgICAgICAgICAgYmVmb3JlT3BlbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc3RhcnRXaW5kb3dTY3JvbGwgPSBfd2luZG93LnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3dpbmRvdy5zY3JvbGxUb3Aoc3RhcnRXaW5kb3dTY3JvbGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gJC5tYWduaWZpY1BvcHVwLmNsb3NlKCk7XHJcblxyXG59IiwiZnVuY3Rpb24gaW5pdFNlbGVjdHJpYygpIHtcclxuICAgICQoJ3NlbGVjdCcpLnNlbGVjdHJpYyh7XHJcbiAgICAgICAgbWF4SGVpZ2h0OiAzMDAsXHJcbiAgICAgICAgYXJyb3dCdXR0b25NYXJrdXA6ICc8YiBjbGFzcz1cImJ1dHRvblwiPjwvYj4nLFxyXG5cclxuICAgICAgICBvbkluaXQ6IGZ1bmN0aW9uIChlbGVtZW50LCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciAkZWxtID0gJChlbGVtZW50KSxcclxuICAgICAgICAgICAgICAgICR3cmFwcGVyID0gJGVsbS5jbG9zZXN0KCcuJyArIGRhdGEuY2xhc3Nlcy53cmFwcGVyKTtcclxuXHJcbiAgICAgICAgICAgICR3cmFwcGVyLmZpbmQoJy5sYWJlbCcpLmh0bWwoJGVsbS5hdHRyKCdwbGFjZWhvbGRlcicpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQmVmb3JlT3BlbjogZnVuY3Rpb24gKGVsZW1lbnQsIGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyICRlbG0gPSAkKGVsZW1lbnQpLFxyXG4gICAgICAgICAgICAgICAgJHdyYXBwZXIgPSAkZWxtLmNsb3Nlc3QoJy4nICsgZGF0YS5jbGFzc2VzLndyYXBwZXIpO1xyXG5cclxuICAgICAgICAgICAgJHdyYXBwZXIuZmluZCgnLmxhYmVsJykuZGF0YSgndmFsdWUnLCAkd3JhcHBlci5maW5kKCcubGFiZWwnKS5odG1sKCkpLmh0bWwoJGVsbS5hdHRyKCdwbGFjZWhvbGRlcicpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQmVmb3JlQ2xvc2U6IGZ1bmN0aW9uIChlbGVtZW50LCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciAkZWxtID0gJChlbGVtZW50KSxcclxuICAgICAgICAgICAgICAgICR3cmFwcGVyID0gJGVsbS5jbG9zZXN0KCcuJyArIGRhdGEuY2xhc3Nlcy53cmFwcGVyKTtcclxuXHJcbiAgICAgICAgICAgICR3cmFwcGVyLmZpbmQoJy5sYWJlbCcpLmh0bWwoJHdyYXBwZXIuZmluZCgnLmxhYmVsJykuZGF0YSgndmFsdWUnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0iLCJmdW5jdGlvbiBpbml0U2xpZGVycygpIHtcclxuICAgIG5ldyBTd2lwZXIoJy5iYW5uZXJfX3NsaWRlcl9fY29udGFpbmVyJywge1xyXG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgc3BlZWQ6IDQwMCxcclxuICAgICAgICBzcGFjZUJldHdlZW46IDI5LFxyXG4gICAgICAgIC8vIG5vU3dpcGluZyxcclxuICAgICAgICBsb29wOiB0cnVlLFxyXG4gICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgbmV4dEVsOiAnLmJhbm5lcl9fYnV0dG9uLW5leHQnLFxyXG4gICAgICAgICAgICBwcmV2RWw6ICcuYmFubmVyX19idXR0b24tcHJldicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uLmJhbm5lcl9fcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcbn0iLCJmdW5jdGlvbiBpbnB1dE51bWJlcigpIHtcclxuXHJcbiAgICBsZXQgcGx1c0lucHV0TnVtYmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmlucHV0LWNvdW50ZXJfX3BsdXMnKTtcclxuICAgIGxldCBtaW51c0lucHV0TnVtYmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmlucHV0LWNvdW50ZXJfX21pbnVzJyk7XHJcblxyXG4gICAgbGV0IGNsYXNzV3JhcElucHV0TnVtYmVyID0gJy5pbnB1dC1jb3VudGVyJztcclxuICAgIGxldCBjbGFzc0lucHV0TnVtYmVyID0gJy5pbnB1dC1jb3VudGVyX19pbnB1dCc7XHJcblxyXG4gICAgcGx1c0lucHV0TnVtYmVyLmZvckVhY2goY3VycmVudCA9PiB7XHJcbiAgICAgICAgaW5jcmVtZW50X2RlY3JlbWVudChjdXJyZW50LCAncGx1cycpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbWludXNJbnB1dE51bWJlci5mb3JFYWNoKGN1cnJlbnQgPT4ge1xyXG4gICAgICAgIGluY3JlbWVudF9kZWNyZW1lbnQoY3VycmVudCwgJ21pbnVzJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbmNyZW1lbnRfZGVjcmVtZW50KGN1cnJlbnQsIHNpZ24pIHtcclxuICAgICAgICBjdXJyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB0aGlzV3JhcCA9IGN1cnJlbnQuY2xvc2VzdChjbGFzc1dyYXBJbnB1dE51bWJlcik7XHJcbiAgICAgICAgICAgIGxldCB0aGlzSW5wdXQgPSB0aGlzV3JhcC5xdWVyeVNlbGVjdG9yKGNsYXNzSW5wdXROdW1iZXIpO1xyXG5cclxuICAgICAgICAgICAgaWYoc2lnbiA9PSAncGx1cycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNJbnB1dC52YWx1ZSsrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihzaWduID09ICdtaW51cycgJiYgdGhpc0lucHV0LnZhbHVlID4gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpc0lucHV0LnZhbHVlLS07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59IiwiZnVuY3Rpb24gbGVnYWN5U3VwcG9ydCgpIHtcclxuICAgIHN2ZzRldmVyeWJvZHkoKTtcclxufSIsImZ1bmN0aW9uIHNjcm9sbFRvcCgpIHtcclxuICAgIF93aW5kb3cuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDI1MCkge1xyXG4gICAgICAgICAgICAkKCcjYmFjay10b3AnKS5mYWRlSW4oMzAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjYmFjay10b3AnKS5mYWRlT3V0KDMwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI2JhY2stdG9wJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuICAgICAgICB9LCA3NTApO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG59IiwiZnVuY3Rpb24gc2VjdGlvbk5hdmlnYXRpb24oKSB7XHJcbiAgICBfZG9jdW1lbnRcclxuICAgICAgICAub24oJ2NsaWNrJywgJ1tocmVmPVwiI1wiXScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbignY2xpY2snLCAnYVtocmVmXj1cIiNzZWN0aW9uXCJdJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgZWwgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICAgICAgJCgnYm9keSwgaHRtbCcpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKGVsKS5vZmZzZXQoKS50b3BcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KVxyXG59IiwiZnVuY3Rpb24gdmhNb2R1bGUoKSB7XHJcblxyXG4gICAgLy8gRmlyc3Qgd2UgZ2V0IHRoZSB2aWV3cG9ydCBoZWlnaHQgYW5kIHdlIG11bHRpcGxlIGl0IGJ5IDElIHRvIGdldCBhIHZhbHVlIGZvciBhIHZoIHVuaXRcclxuICAgIGxldCB2aCA9IHdpbmRvdy5pbm5lckhlaWdodCAqIDAuMDE7XHJcbiAgICAvLyBUaGVuIHdlIHNldCB0aGUgdmFsdWUgaW4gdGhlIC0tdmggY3VzdG9tIHByb3BlcnR5IHRvIHRoZSByb290IG9mIHRoZSBkb2N1bWVudFxyXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXZoJywgYCR7dmh9cHhgKTtcclxuXHJcbiAgICAvLyBXZSBsaXN0ZW4gdG8gdGhlIHJlc2l6ZSBldmVudFxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgIC8vIFdlIGV4ZWN1dGUgdGhlIHNhbWUgc2NyaXB0IGFzIGJlZm9yZVxyXG4gICAgbGV0IHZoID0gd2luZG93LmlubmVySGVpZ2h0ICogMC4wMTtcclxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS12aCcsIGAke3ZofXB4YCk7XHJcbiAgICAvLyBoZWFkZXJIZWlnaHRGdW4oKTtcclxuICAgIH0pO1xyXG5cclxufSJdfQ==
