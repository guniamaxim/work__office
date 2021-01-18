function customFadeToggle(elem, displayValue, msEffect) {
    // проверяем значение свойства display на block или flex
    if(getComputedStyle(elem).display == 'block' || getComputedStyle(elem).display == 'flex') {
         customFadeOut(elem, msEffect);
    } // если display: none
    else  { 
        customFadeIn(elem, displayValue, msEffect);
    }
}