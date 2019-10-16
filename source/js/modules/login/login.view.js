export default class LoginView {
    constructor() {
        this.DOMElements = {
            logInBtn : document.querySelector('#user-list'),
            logOutBen : document.querySelector('#select-all'),
        };
    }

    getCredentials() {}
    hideMsg(){}
    showMsg(){}
    showLogout(){}

    init(items) {}

    buildView() {}

    getItemToSave() {}

    setSavedData(data) {}

    setUpdatedData(data) {}
}