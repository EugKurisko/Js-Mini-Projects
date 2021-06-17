// storage controller
const StorageCtrl = (() => {
    return {
        storeItem: function (item) {
            let items;
            if (!localStorage.getItem('items')) {
                items = [];
            }
            else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            items.push(item);
            localStorage.setItem('items', JSON.stringify(items));
        },
        getItemsFromStorage: function () {
            let items;
            if (!localStorage.getItem('items')) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateStoredItem: function (updatedItem) {
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach((item, index) => {
                if (item.id === updatedItem.id) {
                    items.splice(index, 1, updatedItem);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        clearStorage: function () {
            localStorage.removeItem('items');
        }
    }
})();

//items controller
const ItemCntrl = (() => {
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // data about all items
    let data = {
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }

    return {
        getAllItems: function () {
            return data.items;
        },
        getCurrentItem: function () {
            return data.currentItem;
        },
        getCalories: function () {
            let total = 0;
            data.items.forEach(item => {
                total += item.calories;
            });
            return total;
        },
        addItem: function (name, calories) {
            let id;
            if (data.items.length > 0) {
                id = data.items[data.items.length - 1].id + 1;
            } else {
                id = 0;
            }
            calories = parseInt(calories);
            const newItem = new Item(id, name, calories);
            data.items.push(newItem);
            console.log(data.items);
            return newItem;
        },
        updateItem: function (name, calories) {
            calories = parseInt(calories);
            data.items.forEach(item => {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                }
            });
            return data.currentItem;
        },
        setCurrentItem: function (id) {
            data.items.forEach(item => {
                if (item.id === id) {
                    data.currentItem = item;
                }
            });
            console.log(data.currentItem);
        }
    }
})();


//ui controller
const UICntrl = (() => {
    // all selectors
    const UISelectors = {
        inputName: '#item-name',
        inputCalories: '#item-calories',
        totalCalories: '.total-calories',
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearbtn: '.clear-btn'
    }

    return {
        getSelectors: function () {
            return UISelectors;
        },
        getInputName: function () {
            return document.querySelector(UISelectors.inputName);
        },
        getInputCalories: function () {
            return document.querySelector(UISelectors.inputCalories);
        },
        displayCalories: function (calories) {
            document.querySelector(UISelectors.totalCalories).innerHTML = calories;
        },
        editPanelDisplay: function (display) {
            if (display === 'none') {
                document.querySelector(UISelectors.addBtn).style.display = 'block';
            } else {
                document.querySelector(UISelectors.addBtn).style.display = 'none';
            }
            document.querySelector(UISelectors.updateBtn).style.display = display;
            document.querySelector(UISelectors.deleteBtn).style.display = display;
            document.querySelector(UISelectors.backBtn).style.display = display;

        },
        hideList: function () {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showList: function () {
            document.querySelector(UISelectors.itemList).style.display = 'block';
        },
        populateItemList: function (items) {
            items.forEach(item => {
                UICntrl.addListItem(item);
            });
        },
        setItemToForm: function () {
            UICntrl.getInputName().value = ItemCntrl.getCurrentItem().name;
            UICntrl.getInputCalories().value = ItemCntrl.getCurrentItem().calories;
        },
        addListItem: function (item) {
            UICntrl.showList();
            document.querySelector(UISelectors.itemList);
            const li = document.createElement('li');
            li.classList.add('collection-item');
            li.setAttribute('id', `item-${item.id}`);
            li.innerHTML = `
                <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            `;
            document.querySelector(UISelectors.itemList).
                insertAdjacentElement('beforeend', li);
        },
        updateListItem: function (item) {
            console.log(item);
            listItems = document.querySelectorAll(UISelectors.listItems);
            listItems = Array.from(listItems);
            listItems.forEach(listItem => {
                if (listItem.getAttribute('id') === `item-${item.id}`) {
                    document.querySelector(`#item-${item.id}`).innerHTML = `
                    <strong>${item.name}: </strong>
                    <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>`;
                }
            });
        },
        clearInput: function () {
            UICntrl.getInputName().value = '';
            UICntrl.getInputCalories().value = '';
        },
        clearAllItems: function () {
            let items = document.querySelectorAll(UISelectors.listItems);
            console.log(items);
            items = Array.from(items);
            items.forEach(item => {
                item.remove();
            });
            UICntrl.hideList();
        }
    }
})();


//app controller
const AppCntr = ((StorageCtrl, ItemCntrl, UICntrl) => {
    //load all events
    const loadEvents = function () {
        const UISelectors = UICntrl.getSelectors();

        document.querySelector(UISelectors.addBtn).addEventListener('click',
            itemAddSubmit);

        document.querySelector(UISelectors.itemList).addEventListener('click',
            ItemEditClick);

        document.querySelector(UISelectors.updateBtn).addEventListener('click',
            ItemUpdateSubmit);

        document.querySelector(UISelectors.clearbtn).addEventListener('click',
            itemClearAll);

    }

    const itemAddSubmit = function (e) {
        e.preventDefault();
        const itemName = UICntrl.getInputName().value;
        const itemCalories = UICntrl.getInputCalories().value;
        if (itemName !== '' && itemCalories !== '') {
            const newItem = ItemCntrl.addItem(itemName, itemCalories);
            totalCalories = ItemCntrl.getCalories();
            UICntrl.displayCalories(totalCalories);
            UICntrl.addListItem(newItem);
            UICntrl.clearInput();
            StorageCtrl.storeItem(newItem);
        }
    }

    const ItemEditClick = function (e) {
        if (e.target.classList.contains('edit-item')) {
            UICntrl.editPanelDisplay('inline');
            //take id of clicked element
            const listId = e.target.parentNode.parentNode.id;
            const listIdArr = listId.split('-');
            const id = parseInt(listIdArr[1]);
            ItemCntrl.setCurrentItem(id);
            UICntrl.setItemToForm();
        }
    }

    const ItemUpdateSubmit = function (e) {
        e.preventDefault();
        const itemName = UICntrl.getInputName().value;
        const itemCalories = UICntrl.getInputCalories().value;
        if (itemName !== '' && itemCalories !== '') {
            const itemToUpdate = ItemCntrl.updateItem(itemName, itemCalories);
            UICntrl.updateListItem(itemToUpdate);
            totalCalories = ItemCntrl.getCalories();
            UICntrl.displayCalories(totalCalories);
            UICntrl.clearInput();
            StorageCtrl.updateStoredItem(itemToUpdate);
            UICntrl.editPanelDisplay('none');
        }
    }

    const itemClearAll = function (e) {
        e.preventDefault();
        console.log(1);
        UICntrl.clearAllItems();
        StorageCtrl.clearStorage();
    }

    return {
        init: function () {
            loadEvents();
            UICntrl.hideList();
            UICntrl.editPanelDisplay('none');
            allItems = ItemCntrl.getAllItems();
            if (allItems) {
                totalCalories = ItemCntrl.getCalories();
                UICntrl.displayCalories(totalCalories);
                UICntrl.populateItemList(allItems);
            }
        }
    }
})(StorageCtrl, ItemCntrl, UICntrl);

AppCntr.init();