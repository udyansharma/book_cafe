let db = require('./database.js');
try {
    db.testingConnection('CREATE DATABASE UD1;').then((result)=>{
        console.log("RESULT IS HERE",result);
    }).catch((e)=>{
        console.log("THE ERROR",e);
    })

} catch (err) {
    console.log("IN TEST DB", err);
}