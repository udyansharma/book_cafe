const db = require('./database');

const publishBook =  (author, bookDetails) => {
    return new Promise((resolve, reject) => {
        let bookDescription = bookDetails.description;
        let booktitle = bookDetails.title;
        let bookPrice = bookDetails.price;
        let bookEntry = [booktitle, bookDescription, author, booktitle, bookPrice]
        db.publishBook(bookEntry).then((result) => {
            resolve();
        }).catch((err) => {
            reject(err);
        });
    });
}

const unPublishBook =  (author, bookDetails) => {
    return new Promise((resolve, reject) => {
        let booktitle = bookDetails.title;
        db.unPublishBook(author, booktitle).then((result) => {
            console.log(result);
            resolve();
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}

const getBooksByUser = (user) => {
    return new Promise((resolve, reject) => {
        db.getBooksByAuthor(user).then((result) => {
            console.log(result);
            resolve(result);
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}

const getAllBooks = () => {
    return new Promise((resolve, reject) => {
        db.getAllBooks().then((result) => {
            console.log(result);
            resolve(result);
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}

const getBooksByTitle = (title) => {
    return new Promise((resolve, reject) => {
        db.getBooksByTitle(title).then((result) => {
            console.log(result);
            resolve(result);
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}

const getBooksById = (title) => {
    return new Promise((resolve, reject) => {
        db.getBooksById(title).then((result) => {
            console.log(result);
            resolve(result);
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}

module.exports = {
    publishBook,
    unPublishBook,
    getBooksByUser,
    getAllBooks,
    getBooksByTitle,
    getBooksById
}