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
        addItem: function (name, calories) {
            let id;
            if (data.items.length > 0) {
                id = data.items[data.items.length - 1] + 1;
            } else {
                id = 0;
            }
            calories = parseInt(calories);
            const newItem = new Item(id, name, calories);
            data.items.push(newItem);
            console.log(data.items);
            return newItem;
        }
    }
})();


//ui controller
const UICntrl = (() => {
    // all selectors
    const UISelectors = {
        inputName: '#item-name',
        inputCalories: '#item-calories',
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
        hideEditPanel: function () {
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
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
        addListItem: function (item) {
            UICntrl.showList();
            document.querySelector(UISelectors.itemList);
            const li = document.createElement('li');
            li.classList.add('collection-item');
            li.setAttribute('id', `item-${item.id}`);
            li.innerHTML = `
                <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content"></a>
            `;
            document.querySelector(UISelectors.itemList).
                insertAdjacentElement('beforeend', li);
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

        document.querySelector(UISelectors.clearbtn).addEventListener('click',
            itemClearAll);
    }

    const itemAddSubmit = function (e) {
        e.preventDefault();
        const itemName = UICntrl.getInputName().value;
        const itemCalories = UICntrl.getInputCalories().value;
        if (itemName !== '' && itemCalories !== '') {
            const newItem = ItemCntrl.addItem(itemName, itemCalories);
            UICntrl.addListItem(newItem);
            UICntrl.clearInput();
            StorageCtrl.storeItem(newItem);
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
            UICntrl.hideEditPanel();
            allItems = ItemCntrl.getAllItems();
            if (allItems) {
                UICntrl.populateItemList(allItems);
            }

        }
    }
})(StorageCtrl, ItemCntrl, UICntrl);

AppCntr.init();