export default class LoginModel {
    constructor() {
        this.loginUrl = "https://raw.githubusercontent.com/iibadreeva/mvc_users/secondary/source/js/modules/data.json";
        this.emailPattern = /^\w+@\w+\.\w{2,4}$/i;
        this.passwordPttern = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;;
        this.errorMsg = null;
        this.errorMsgMap = {
            "empty"     : "Пожалуйста заполните поля логин и пароль",
            "loginError" : "Логин введен неверно. Только латинские буквы.",
            "passError" : "Пароль введен неверно. Тлько латинские буквы, цифры. Длина не мение 6 символов",
            "missmatch" : "Неправильные логин и пароль."
        };
    }

    validate(creadential) {
        return this.isEmpty(creadential)
            && this.isEmailAssertPattern(creadential)
            && this.isPasswordAssertPattern(creadential);
    }

    login(credentials) {
        let options = {
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
            method: 'post',
            body: JSON.stringify(credentials)
        };

        return fetch(this.loginUrl)
            .then(pesponce => pesponce.json())
            .then(data => {
                const login = credentials.login;
                const password = credentials.password;

                let res = false;

                data.adminUser.forEach(item => {
                    if(item.login == login && item.password == password) res = true;
                });

               if(res) {
                   localStorage.setItem('credentials', JSON.stringify(credentials));
                   data.loginStatus = true;
               } else {
                    this.setErrorMsg("missmatch");
               }
               return data;
            });
    }

    getErrorMsg() {
        return this.errorMsg;
    }

    setErrorMsg(key) {
        this.errorMsg = this.errorMsgMap[key];
        return false
    }

    isEmpty(credentials){
        return (credentials.login && credentials.password) || this.setErrorMsg("empty");
    }

    isEmailAssertPattern(credentials) {
        return this.emailPattern.test(credentials.login) || this.setErrorMsg("loginError");
    }

    isPasswordAssertPattern(credentials) {
        return this.passwordPttern.test(credentials.password) || this.setErrorMsg("passError");
    }

    logout() {
        localStorage.removeItem("credentials");
    }
}