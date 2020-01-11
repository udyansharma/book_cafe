const mysql = require('mysql');
const config = require('../config/config.json');
var pool;
try {
    pool = mysql.createPool(config.db);
}
catch (err) {
    console.log("Unable to create pool. Kindly check the db params");
}

const testingConnection = (query) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Unable to get connection");
                reject(err);
            }
            connection.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
            connection.release();
            if (err) {
                reject(err);
            }
        })
    });
};

const signUp = (userName, password, salt) => {
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
                        connection.query(mysql.format('INSERT INTO user VALUES(?,?,?,NULL)', [userName, password, salt]), (err, result) => {
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

const getUserDetails = (userName, password, salt) => {
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

module.exports = {
    testingConnection: testingConnection,
    signUp: signUp,
    getUserDetails: getUserDetails
}