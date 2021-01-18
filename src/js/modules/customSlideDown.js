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