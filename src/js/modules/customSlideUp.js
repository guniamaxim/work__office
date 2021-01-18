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