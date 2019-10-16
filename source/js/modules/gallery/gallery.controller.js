import utils from '../utils';
export default class GalleryController {
    constructor(model, view, observer, utils){
        this.model = model;
        this.view = view;
        this.observer = observer;
        this.utils = utils;

        this.pageConfig = {
            itemsPerPage: 10,
            currentPage: 0
        };
        this.init();
    }

    initListeners() {
        this.view.DOMElements.userList.addEventListener('click', this.tableLineHandler.bind(this));

        this.view.DOMElements.search.addEventListener('keyup', this.searchHandler.bind(this));
        this.view.DOMElements.emailDropdown.addEventListener('click', this.sortingHandler.bind(this, this.view.DOMElements.emailDropdown));
        this.view.DOMElements.roleDropdown.addEventListener('click', this.sortingHandler.bind(this, this.view.DOMElements.roleDropdown));

        this.view.DOMElements.nextBtn.addEventListener('click', this.getNextPageHandler.bind(this));
    }

    tableLineHandler(event) {
        event.preventDefault();
        let isButton = event.target.getAttribute('data-row-id');
        isButton ? this.openDetail(isButton) : this.view.selectTableLine(event)
    }

    openDetail(buttonId) {
        let user = this.model.getUserById(buttonId).then(data => {
            this.view.showSingleUser(data);
        })
    }

    searchHandler(event) {
        event.preventDefault();
        let value = event.target.value;
        if(event.keyCode === 13 && (value.length == 0 || value.length > 2)){
            this.pageConfig.currentPage = 0;
            this.view.clearList();
            this.view.buildUsersList((utils.sortingConfig("Find", this.getNextPage())));
        }
    }

    sortingHandler(that, event) {
        event.preventDefault();
        const res = this.view.updateButtonText(event, that);
        res && this.applySortingMethod(this.view.getSortingType(event));
    }

    getNextPageHandler(event) {
        event && event.preventDefault();
        this.view.buildUsersList(this.getNextPage());
        this.isLastPage();
    }

    applySortingMethod(sortingType) {
        if(!sortingType) {return}
        this.pageConfig.currentPage = 0;
        this.view.clearList();
        this.view.buildUsersList(utils.sortingConfig(sortingType, this.getNextPage()))
    }

    getNextPage() {
        let start = this.pageConfig.itemsPerPage * this.pageConfig.currentPage;
        let end = this.pageConfig.itemsPerPage + start;
        this.pageConfig.currentPage++;
        return this.model.usersListData.slice(start, end);
    }

    isLastPage() {
        if(this.isMaxPage()){
            this.view.blockNextPage();
            this.countStats();
        }
    }

    isMaxPage() {
        return (this.pageConfig.currentPage * this.pageConfig.itemsPerPage) >= this.model.usersListData.length;
    }

    countStats() {
        let stats = this.model.usersListData.reduce(function (sum, item) {
            (item.role == 'Admin') ? sum.admins++ : sum.users++;
            return sum;
        }, {admins: 0, users: 0});
        this.view.showStats(stats);
    }

    init() {
        this.model.getUserList().then(data => {
            this.initListeners();
            this.view.buildUsersList(this.getNextPage());
            this.isLastPage();
        });

    }
}