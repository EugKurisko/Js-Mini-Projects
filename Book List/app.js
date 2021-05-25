class BookItem {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBook(book) {
        const table = document.querySelector('#book-list');
        let row = table.insertRow(0);
        let titleCol = row.insertCell(0);
        titleCol.appendChild(document.createTextNode(book.title));
        let authorCol = row.insertCell(1);
        authorCol.appendChild(document.createTextNode(book.author));
        let isbnCol = row.insertCell(2);
        isbnCol.appendChild(document.createTextNode(book.isbn));
        let linkCol = row.insertCell(3);
        let link = document.createElement('a');
        link.appendChild(document.createTextNode('x'));
        link.setAttribute('href', '#');
        link.setAttribute('class', 'delete');
        linkCol.appendChild(link);
    }

    clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    deleteBook(row) {
        if (row.className == 'delete') {
            row.parentNode.parentNode.remove();
            Storage.removeBook(row.parentNode.previousElementSibling.textContent);
        }
    }
}

class Storage {
    static getBooks() {
        let books = localStorage.getItem('books');
        if (!books) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks() {
        const books = Storage.getBooks();
        if (books) {
            books.forEach(function (book) {
                const ui = new UI();
                ui.addBook(book);
            })
        }
    }

    static addBook(book) {
        const books = Storage.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Storage.getBooks();
        books.forEach(function (book, index) {
            if (book.isbn == isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', function () {
    if (Storage.getBooks()) {
        Storage.displayBooks();
    }
});

const form = document.querySelector('#book-form').addEventListener('submit', createBook);
document.getElementById('book-list').addEventListener('click', removeFromList);

function createBook(e) {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    if (validate(title, author, isbn)) {
        addMessage('Book added', 'success');
    }
    else {
        addMessage('Fill all fields, please', 'error');
        return;
    }
    const book = new BookItem(title, author, isbn);
    const ui = new UI();
    ui.addBook(book);
    ui.clearFields();
    Storage.addBook(book);
}

function validate(title, author, isbn) {
    if (!title || !author || !isbn) {
        return false;
    }
    return true;
}

function addMessage(textMSG, className) {
    let msg = document.createElement('p');
    const container = document.querySelector('.container');
    const header = document.querySelector('h1');
    msg.appendChild(document.createTextNode(textMSG));
    msg.setAttribute('class', className);
    container.insertBefore(msg, header);
    setTimeout(function () {
        msg.remove();
    }, 2000);
}

function removeFromList(e) {
    e.preventDefault();
    let ui = new UI();
    ui.deleteBook(e.target);
    addMessage('Book deleted', 'success');
}