export default class GalleryView {
    constructor() {
        this.DOMElements = {
            userList : document.querySelector('#user-list'),
            selectAll : document.querySelector('#select-all'),
            statsInfo : document.querySelector('#stats'),

            emailDropdown : document.querySelector('#dropdown-email'),
            roleDropdown : document.querySelector('#dropdown-role'),
            search : document.querySelector('#inputSearch'),
            nextBtn : document.querySelector('#next-page'),
            backBtn : document.querySelector('#back-btn-list'),

            detailsView : document.querySelector('#details-view'),
            mainView : document.querySelector('#main-view'),
            detailsItems : document.querySelector('#details-items'),

            usersList : document.querySelectorAll('.users-list'),
            singleUser : document.querySelector('.single-user'),
            singleUserDetails : document.querySelector('#single-user-details'),
        };

        this.counter = 0;
        this.DOMElements.selectAll.addEventListener("click", this.selectAllItems.bind(this));
        this.DOMElements.backBtn.addEventListener("click", this.hideSingleUser.bind(this));
    }

    tableTemplate(item) {
        return `<tr>
        <th scope="row">
            <input type="checkbox">
        </th>
        <th scope="row">${item.id}</th>
        <td>${item.name}</td>
        <td>${item.username}</td>
        <td>${item.role}</td>
        <td>${item.email}</td>
        
        <td data-toggle="tooltip" title="${item.address.zipcode}, ${item.address.city}, ${item.address.street}">${item.address.street}</td>
        <td>${item.website}</td>
        <td>
            <div class="text-center">
            <a href="#" data-row-id="${item.id}" class="btn btn-primary btn-sm">Открыть</a>
            </div>
        </td>
    </tr>`;
    }

    singleUserTemmplate(item) {
        return `<form class="needs-validation" novalidate="">
            <div class="row">
            <div class="col-md-6 mb-3">
                <label for="first name">Name</label>
                <input type="text" class="form-control" value="${item.name}" readonly>
            </div>
            <div class="col-md-6 mb-3">
                <label for="first name">Role</label>
                <input type="text" class="form-control" value="${item.role}" readonly>
            </div>
            <div class="col-md-6 mb-3">
                <label for="last name">Login</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">@</span>
                    </div>
                    <input type="text" class="form-control" value="${item.username}" readonly>
                </div>                
            </div>
            <div class="col-md-6 mb-3">
                <label for="email">Email <span class="text-muted">Опционално</span> </label>
                <input type="text" class="form-control" value="${item.email}" readonly>
            </div>
            <div class="col-md-6 mb-3">
                <label for="address">Address</label>
                <input type="text" class="form-control" value="${item.address.zipcode}, ${item.address.city}, ${item.address.street}" readonly>
            </div>
            </div>
        </form>`
    }

    selectAllItems(event) {
        let checkboxes = this.DOMElements.userList.querySelectorAll('input[type=checkbox]');
        checkboxes.forEach(item => this.DOMElements.selectAll.checked ? item.checked = true : item.checked = false);
    }

    selectTableLine(event) {
        let tableLines = event.currentTarget.querySelectorAll('tr');
        tableLines.forEach(item => item.classList.remove('table-active'));
        event.target.closest('tr').classList.add('table-active');
    }

    clearList() {
        this.DOMElements.userList.innerHTML = "";
        this.hideNextPage();
    }

    updateButtonText(event, that) {
        const dropMenu = that.querySelector('.dropdown-menu');
        let res = true;

        if( dropMenu.classList.contains('show') ) {
            dropMenu.classList.remove('show');
            event.currentTarget.querySelector("button").innerHTML = event.target.innerText;
        }
        else {
            dropMenu.classList.add('show');
            res = false;
        }

        return res;
    }

    getSortingType(event) {
        return event.target.getAttribute("sorting-type");
    }

    blockNextPage() {
        this.DOMElements.nextBtn.classList.add("disabled");
    }

    hideNextPage() {
        this.DOMElements.nextBtn.classList.add('hide');
    }

    showStats(stats) {
        this.DOMElements.statsInfo.innerHTML = `Статистика системы. Админов: ${stats.admins}, Пользователей: ${stats.users}`;
    }

    buildUsersList(page, filterSortFunction) {
        filterSortFunction && page;
        let result = page.map(item => this.tableTemplate(item));
        this.DOMElements.userList.innerHTML += result.join("");
    }

    showSingleUser(item) {
        this.DOMElements.usersList.forEach(item => item.classList.add("hide"));
        this.DOMElements.singleUser.classList.remove('hide');
        this.DOMElements.singleUserDetails.innerHTML = this.singleUserTemmplate(item);
    }

    hideSingleUser() {
        this.DOMElements.singleUser.classList.add('hide');
        this.DOMElements.usersList.forEach(item => item.classList.remove("hide"));
    }
}