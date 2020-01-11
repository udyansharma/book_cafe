const db = require('./database');

const publishBook = async (author, bookDetails) => {
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

const unPublishBook = async (author, bookDetails) => {
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
module.exports = { publishBook, unPublishBook }