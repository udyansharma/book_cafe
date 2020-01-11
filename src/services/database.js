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
    return new Promise((resolve,reject)=>{
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

module.exports = { testingConnection: testingConnection }