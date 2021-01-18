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