import utils from '../utils';
export default class LoginController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    bindEvents() {}

    initListeners() {
        this.view.DOMElements.logInBtn.addEventListener("click", this.loginHandler.bind(event));
        this.view.DOMElements.logOutBen.addEventListener("click", this.logoutHandler.bind(event));
    }

    loginHandler(e) {
        e.preventDefault();
        let credentials = this.view.getCredentials();
        if(this.model.valueOf(credentials)) {
            this.model.login(credentials).then(
                data => {
                    if(data.loginStatus) {
                        this.view.hideMsg();
                        this.view.showLogout();
                        utils.navigateTo("gallery");
                    } else {
                        this.view.showMsg(this.model.getErrorMsg());
                    }
                }
            );
        }
    }

    logoutHandler() {
        this.view.hideLogout();
        this.model.logout();
    }

    init() {}
}