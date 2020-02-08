
const db = require('./database');
const bcrypt = require('bcrypt');
const signUp = (input) => {
    return new Promise((resolve, reject) => {
        let userName = input.userName;
        let userPassword = input.password;
        bcrypt.hash(userPassword, 2, function (err, hashedPassword) {
            if (err) {
                reject("Unable To Create Your Account Right Now");
            }
            db.signUp(userName, hashedPassword).then((result) => {
                console.log(result);
                resolve();
            }).catch((err) => {
                reject(err);
            });
        })
    })
};
const signIn = (input) => {
    return new Promise((resolve, reject) => {
        let userName = input.userName;
        let userPassword = input.password;
        db.getUserDetails(userName).then((result) => {
            bcrypt.compare(userPassword, result.password, (err, match) => {
                if (err) {
                    console.log(err);
                    reject("Server Error");
                }
                match ? resolve(result) : reject("Are You Sure? You Entered The Right Details");
            })
        }).catch((err) => {
            console.log(err);
            reject(err);
        })
    });
}
module.exports = {
    signUp: signUp,
    signIn: signIn
}