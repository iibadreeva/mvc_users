import utils from './utils';
import Observer from './gallery/observer';
import GalleryController from './gallery/gallery.controller';
import GalleryModel from './gallery/gallery.model';
import GalleryView from './gallery/gallery.view';

import LoginController from './login/login.controller';
import LoginModel from './login/login.model';
import LoginView from './login/login.view';


let activatedRoutes = {};

let routeConfig = {
    "" : {
        show : () => {
            const login = document.querySelector('#login-view');
            const main = document.querySelector('#main-view');
            const info = document.querySelector('#info-view');

            utils.showView([login]);
            utils.hideView([main, info]);
        },
        init : () => {
            let model = new LoginModel;
            let view = new LoginView;
            new LoginController(model, view);
        }
    },
    "gallery" : {
        show : () => {
            const login = document.querySelector('#login-view');
            const main = document.querySelector('#main-view');
            const info = document.querySelector('#info-view');

            utils.showView([main]);
            utils.hideView([login, info]);
        },
        init : () => {
            let observer = new Observer;
            let model = new GalleryModel;
            let view = new GalleryView;
            new GalleryController(model, view, observer, new utils());
        }
    },
    "info" : {
        show : () => {
            const login = document.querySelector('#login-view');
            const main = document.querySelector('#main-view');
            const info = document.querySelector('#info-view');

            utils.showView([info]);
            utils.hideView([login, main]);
        },
        init : () => {
        }
    },
};
export function updateRoute() {
    let routeName = document.location.hash.replace(/^#/,'');
    if(activatedRoutes[routeName]) {
        activatedRoutes[routeName]();
    } else {
        let route = routeConfig[routeName];
        if(route) {
            route.init();
            route.show();
            activatedRoutes[routeName] = route.show;
        }
    }
}
