import Handlebars from 'handlebars/dist/cjs/handlebars';

export const View = {
    render: function(templateName, model) {
        templateName = templateName + 'Template';

        const templateElement = document.getElementById(templateName),
            templateSource = templateElement.innerHTML,
            renderFn = Handlebars.compile(templateSource);

        return renderFn(model);
    }
};

export const find = function(array, value) {// поиск по массиву
    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) return i;
    }
    return -1;
};

export const HMSToSec = function(hms) {       //hh:mm:ss в sec
    hms = hms.split(':');
    return hms[2]*1+hms[1]*60+hms[0]*3600;
};

export const duplicateArray = function(arr){
    let res = [];
    res = res.concat(Object.assign({}, arr));
    return res[0]
};

export const fullScreen = function() {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }


    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
};




