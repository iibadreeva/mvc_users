import utils from '../utils';

export default class LoginController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.initListeners();
    }

    bindEvents() {}

    initListeners() {
        this.view.DOMElements.logInBtn.addEventListener('click', this.loginHandler.bind(this));
        this.view.DOMElements.logOutBen.addEventListener("click", this.logoutHandler.bind(this));
    }

    loginHandler(e) {
        e.preventDefault();

        let credentials = this.view.getCredentials();

        if(this.model.validate(credentials)) {
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
        } else {
            console.log('er', this.model.getErrorMsg())
            this.view.showMsg(this.model.getErrorMsg());
        }
    }

    logoutHandler() {
        this.view.hideLogout();
        this.model.logout();
        utils.navigateTo("");
    }

    init() {}
}