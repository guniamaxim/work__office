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