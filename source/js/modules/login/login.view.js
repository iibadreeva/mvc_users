export default class LoginView {
    constructor() {
        this.DOMElements = {
            login : document.querySelector('#inputEmail'),
            password : document.querySelector('#inputPassowrd'),
            alert : document.querySelector('.alert'),

            logInBtn : document.querySelector('#log-in-btn'),
            logOutBen : document.querySelector('#log-out-btn'),
        };
    }

    showMsg(msg) {
        if(msg) {
            this.DOMElements.alert.classList.remove("hide");
            this.DOMElements.alert.innerHTML = msg;
        }
    }

    hideMsg() {
        this.DOMElements.alert.classList.add('hide');
    }

    showLogout() {
        this.DOMElements.logOutBen.classList.remove('hide');
    }

    hideLogout() {
        this.DOMElements.logOutBen.classList.add('hide');
    }

    getCredentials() {
        return {
            login: this.DOMElements.login.value,
            password: this.DOMElements.password.value
        }
    }
}