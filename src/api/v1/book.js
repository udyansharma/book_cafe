const router = require('express').Router();
const inputValidator = require('../../services/validations.js');
const books = require('../../services/books.js');
const config = require('../../config/config.json');

// Route To Publish Books
// Sorry Books FROM THANOS Not Allowed
router.post("/sellYourBookForGood", async (req, res, next) => {
    console.log("USER",res.locals.loggedInUser);
    let loggedInUser = res.locals.loggedInUser.author_pseudonym;
    if (config.application.bannedUsers.includes(loggedInUser.toUpperCase())) {
        return res.status(400).send("SORRY!! " + loggedInUser + " As We Don't Want to Spread Your Ideology In This World. We Want That You Do Not Sell Books That You Have Read. ");
    }
    try {
        inputValidator.publishingBook(req.body);
        await books.publishBook(loggedInUser, req.body);
        return res.status(200).send("You Have Successfully Added Your Book");
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

// Unpublish Your Book
router.post("/takeAwayAllTheGoodness", async (req, res, next) => {
    console.log("USER",res.locals.loggedInUser);
    let loggedInUser = res.locals.loggedInUser.author_pseudonym;
    try {
        inputValidator.unPublishingBook(req.body);
        await books.unPublishBook(loggedInUser, req.body);
        return res.status(200).send("You Have Successfully Deleted "+req.body.title);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

// Get Books That You Published
router.get("/yourHolyProperty", (req, res, next) => {

});

router.get("/getBookList", (req, res, next) => {

});

router.get("/getBookById", (req, res, next) => {

});

router.get("/getBookByTitle", (req, res, next) => {

});

module.exports = router;