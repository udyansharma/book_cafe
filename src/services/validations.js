const signingUp = (input) => {
    if (JSON.stringify(input) === "{}") {
        throw "You Did Not Sent Any Data To Us";
    }
    if (!input.userName) {
        throw "User Name Missing";
    }
    if (!input.password) {
        throw "Password Missing";
    }
    if (!input.confirmPassword) {
        throw "You Forgot To Confirm Your password";
    }
    if (input.password !== input.confirmPassword) {
        throw "Your Password's Do Not Match "
    }
    if (input.password.length <= 3) {
        throw "Sorry Your Password Must Be Of More Than 3 Characters."
    }
};
const signingIn = (input) => {
    if (JSON.stringify(input) === "{}") {
        throw "You Did Not Sent Any Data To Us";
    }
    if (!input.userName) {
        throw "User Name Missing";
    }
    if (!input.password) {
        throw "Password Missing";
    }
};

module.exports = {
    signingUp: signingUp,
    signingIn: signingIn
}