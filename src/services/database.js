const mysql = require('mysql');
const config = require('../config/config.json');
var pool;
try {
    pool = mysql.createPool(config.db);
}
catch (err) {
    console.log("Unable to create pool. Kindly check the db params");
}

const signUp = (userName, password) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Unable to get connection");
                reject(err);
            }
            connection.query(mysql.format('SELECT count(*) as user_check FROM user where author_pseudonym=?', [userName]), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (result[0].user_check != 0) {
                        reject("Sorry Can You Pick Up Some Other UserName. This One Is Already Acquired.");
                    }
                    else {
                        connection.query(mysql.format('INSERT INTO user VALUES(?,?,NULL)', [userName, password]), (err, result) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(result);
                            }
                        });
                    }
                }

            })
            connection.release();
            if (err) {
                reject(err);
            }
        })
    });

};

const getUserDetails = (userName) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Unable to get connection");
                reject(err);
            }

            connection.query(mysql.format('SELECT * FROM user where author_pseudonym=?', [userName]), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (!result[0]) {
                        reject("Sorry You Are Not A Registered User");
                    }
                    else {
                        resolve(result[0]);
                    }
                }

            })
            connection.release();
            if (err) {
                reject(err);
            }
        })
    });

};

const publishBook = (bookDetails) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Unable to get connection");
                reject(err);
            }

            connection.query(mysql.format('SELECT count(*) as book_check FROM book where title=?', bookDetails[0]), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (result[0].book_check != 0) {
                        reject("Sorry This Book Is Already Up For Sale. Please Try Some Other Book");
                    }
                    else {
                        connection.query(mysql.format('INSERT INTO book VALUES (NULL,?,?,?,?,?)', bookDetails), (err, result) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve();
                            }

                        })
                    }
                }

            })
            connection.release();
            if (err) {
                reject(err);
            }
        })
    });
}

const unPublishBook = (author, bookTitle) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Unable to get connection");
                reject(err);
            }

            connection.query(mysql.format('SELECT count(*) as book_check FROM book where title=? AND author=?', [bookTitle, author]), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (result[0].book_check == 0) {
                        reject("Are You Sure You Published This Book? We Don't Think So. In Case You Did, Please Cross Check The Title From The List Of All Books.");
                    }
                    else {
                        connection.query(mysql.format('DELETE from book where title=?', [bookTitle]), (err, result) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve();
                            }

                        })
                    }
                }
            })
            connection.release();
            if (err) {
                reject(err);
            }
        })
    });
}

const getBooksByAuthor = (author) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Unable to get connection");
                reject(err);
            }

            connection.query(mysql.format('SELECT * FROM book WHERE author=?', [author]), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (result.length == 0) {
                        reject("You Have No Current Publications Up For Sale");
                    }
                    else {
                        resolve(result);
                    }
                }
            })
            connection.release();
            if (err) {
                reject(err);
            }
        })
    });
}

const getAllBooks = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Unable to get connection");
                reject(err);
            }

            connection.query(mysql.format('SELECT * FROM book'), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            })
            connection.release();
            if (err) {
                reject(err);
            }
        })
    });
}

const getBooksById = (bookId) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Unable to get connection");
                reject(err);
            }

            connection.query(mysql.format('SELECT * FROM book where id=?',bookId), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (result.length == 0) {
                        reject("No Book With Id -"+ bookId);
                    }
                    resolve(result);
                }
            })
            connection.release();
            if (err) {
                reject(err);
            }
        })
    });
}

const getBooksByTitle = (bookTitle) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Unable to get connection");
                reject(err);
            }
            connection.query(mysql.format('SELECT * FROM book where title=?',bookTitle), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (result.length == 0) {
                        reject("No Book With Title -"+ bookTitle);
                    }
                    resolve(result);
                }
            })
            connection.release();
            if (err) {
                reject(err);
            }
        })
    });
}


module.exports = {
    signUp,
    getUserDetails,
    publishBook,
    unPublishBook,
    getBooksByAuthor,
    getAllBooks,
    getBooksById,
    getBooksByTitle
}