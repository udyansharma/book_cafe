const router = require('express').Router();
const inputValidator = require('../../services/validations.js');
const books = require('../../services/books.js');
const config = require('../../config/config.json');

// Route To Publish Books
// Sorry Books FROM THANOS Not Allowed
router.post("/sellYourBookForGood", async (req, res, next) => {
    console.log("USER", res.locals.loggedInUser);
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
    console.log("USER", res.locals.loggedInUser);
    let loggedInUser = res.locals.loggedInUser.author_pseudonym;
    try {
        inputValidator.unPublishingBook(req.body);
        await books.unPublishBook(loggedInUser, req.body);
        return res.status(200).send("You Have Successfully Deleted " + req.body.title);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

// Get Books That You Published
router.get("/yourHolyProperty", async (req, res, next) => {
    console.log("USER", res.locals.loggedInUser);
    let loggedInUser = res.locals.loggedInUser.author_pseudonym;
    try {
        let userBooks = await books.getBooksByUser(loggedInUser);
        return res.status(200).json({ userBooks });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.get("/getBookList", async (req, res, next) => {
    try {
        let allBooks = await books.getAllBooks();
        if (JSON.stringify(allBooks) === "[]")
            return res.status(200).send("No Books Have Been Published So Far");
        return res.status(200).json({ allBooks });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.get("/getBookById", async (req, res, next) => {
    try {
        console.log("ITS", req.query);
        inputValidator.gettingBooksById(req.query);
        let userBooks = await books.getBooksById(JSON.parse(req.query.id));
        return res.status(200).json({ userBooks });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }

});

router.get("/getBookByTitle", async (req, res, next) => {
    try {
        console.log("ITS", req.query);
        inputValidator.gettingBooksByTitle(req.query);
        let userBooks = await books.getBooksByTitle(JSON.parse(req.query.title));
        return res.status(200).json({ userBooks });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

module.exports = router;