export default class LoginModel {
    constructor() {
        this.loginUrl = "https://raw.githubusercontent.com/iibadreeva/mvc_users/secondary/source/js/modules/data.json#";
        this.emailPattern = /^\w+@\w+\.\w{2,4}$/i;
        this.passwordPttern = /^[a-zA-Z0-9]]{8,30}$/;
        this.errorMsg = null;
        this.errorMsgMap = {
            "empty"     : "Пожалуйста заполните поля логин и пароль",
            "loginEror" : "Логин введен неверно. Только латинские буквы.",
            "passError" : "Пароль введен неверно. Тлько латинские буквы",
            "missmatch" : "Неправильные логин и пароль."
        };
    }

    validate(creadential) {
        return this.isEmpty(creadential)
            && this.isEmailAssertPattern(creadential)
            && this.isPasswordAssertPattern(creadential);
    }

    getData() {}
    saveData(item) {}
    updateData(counter) {}
    login(){}
    getErrorMsg(){}
    hideLogout(){}
    logout(){}
    isEmpty(){}
    isEmailAssertPattern(){}
    isPasswordAssertPattern(){}
}