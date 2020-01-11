const router = require('express').Router();
const inputValidator = require('../../services/validations.js');
const user = require('../../services/user.js');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json')

router.post("/signIn", async (req, res, next) => {
    try {
        inputValidator.signingIn(req.body);
        let fetchedUser = await user.signIn(req.body);
        let token = jwt.sign({ fetchedUser }, config.application.signature, { expiresIn: config.application.jwtexpiration });
        return res.status(200).send({ "message": "You Are Now Logged In", "token": token });
    }
    catch (err) {
        console.log(err);
        if (err == "Server Error") {
            return res.status(500).send("We Are Sorry. It's Not You It's Us.");
        }
        res.status(400).send(err);
    }
});

router.post("/signUp", async (req, res, next) => {
    try {
        inputValidator.signingUp(req.body);
        await user.signUp(req.body);
        return res.status(200).send("Welcome Onboard");
    }
    catch (err) {
        console.log(err);
        if (err == "Unable To Create Your Account Right Now") {
            return res.status(500).send("We Are Sorry. It's Not You It's Us.");
        }
        res.status(400).send(err);
    }
});

router.get("/getBookList", (req, res, next) => {

});

router.get("/getBookById", (req, res, next) => {

});

module.exports = router;