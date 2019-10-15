export default class Utils {
    constructor() {
    }

    static sortingConfig(type, page) {
        switch (type) {
            case "A":
                page.sort((a, b) => {
                    return a.email > b.email ? 1 : -1;
                });
                return page;
                break;
            case "Z":
                page.sort((a, b) => {
                    return a.email < b.email ? 1 : -1;
                });
                return page;
                break;
            case "Admin":
                return page.filter((item) => {
                    return item.role == 'Admin'
                });
                break;
            case "User":
                return page.filter((item) => {
                    return item.role == 'User'
                });
                break;
            case "Find":
                let exp = new RegExp(event.target.value, "i")
                return page.filter(item => {
                    return exp.test(item.name);
                })
                break;
        }
    }

    static showView(views) {
        views.forEach(element => {
            element.classList.remove('hide');
        });
    }

    static hideView(views) {
        views.forEach(element => {
            element.classList.add('hide')
        })
    }

    static navigateTo(routeName) {
        window.location.hash = "#" + routeName;
    }
}