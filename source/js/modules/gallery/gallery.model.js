export default class GalleryModel {
    constructor() {
        this.loginUrl = "https://raw.githubusercontent.com/iibadreeva/mvc_users/secondary/source/js/modules/data.json";
        this.usersListData = [];
    }

    getUserList() {
        return fetch(this.loginUrl).then(pesponce => pesponce.json())
            .then(data => {
                console.log('Data is loaded');
                this.usersListData = data.usersList;
                return data.usersList;
            });
    }

    getUserById(id) {
        return fetch(this.loginUrl).then(pesponce => pesponce.json())
            .then(data => {
                const res = data.usersList.find(item => item.id == id);
                console.log('Data single is loaded', res);
                return res;
            });
    }

    saveUser(item) {}

    updateUser(counter) {}
}