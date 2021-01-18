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