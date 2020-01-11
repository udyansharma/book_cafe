const router = require('express').Router();
const redis = require('redis');
const inputValidator = require('../../services/validations.js');
const books = require('../../services/books.js');
const config = require('../../config/config.json');
const redisClient = redis.createClient();


redisClient.on('error', (err) => {
    console.log("Error REDIS" + err);
});

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
router.get("/yourHolyProperty", (req, res, next) => {
    console.log("USER", res.locals.loggedInUser);
    let loggedInUser = res.locals.loggedInUser.author_pseudonym;
    try {
        redisClient.get('books' + loggedInUser, async (err, result) => {
            if (err) {
                console.log("Redis Error", err);
                return res.status(500).send("Server Error");
            }
            if (result) {
                return res.status(200).json({ userBooks: JSON.parse(result) });
            }
            else {
                let userBooks = await books.getBooksByUser(loggedInUser);
                redisClient.set('books' + loggedInUser, JSON.stringify(userBooks));
                redisClient.expire('books' + loggedInUser, 40);
                return res.status(200).json({ userBooks });
            }
        })

    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.get("/getBookList", async (req, res, next) => {
    try {
        redisClient.get('allBooks', async (err, result) => {
            if (err) {
                console.log("Redis Error", err);
                return res.status(500).send("Server Error");
            }
            if (result) {
                console.log("GETTING FROM REDIS");
                return res.status(200).json({ allBooks: JSON.parse(result) });
            }
            else {
                let allBooks = await books.getAllBooks();
                if (JSON.stringify(allBooks) === "[]")
                    return res.status(200).send("No Books Have Been Published So Far");
                redisClient.set('allBooks', JSON.stringify(allBooks));
                redisClient.expire('allBooks', 40);
                return res.status(200).json({ allBooks });
            }
        })
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.get("/getBookById", async (req, res, next) => {
    try {
        console.log("ITS", req.query);
        inputValidator.gettingBooksById(req.query);
        let bookId = JSON.parse(req.query.id);
        redisClient.get('book' + bookId, async (err, result) => {
            if (err) {
                console.log("Redis Error", err);
                return res.status(500).send("Server Error");
            }
            if (result) {
                return res.status(200).json({ userBooks: JSON.parse(result) });
            }
            else {
                let userBooks = await books.getBooksById(bookId);
                redisClient.set('book' + bookId, JSON.stringify(userBooks));
                redisClient.expire('book' + bookId, 40);
                return res.status(200).json({ userBooks });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }

});

router.get("/getBookByTitle", async (req, res, next) => {
    try {
        console.log("ITS", req.query);
        inputValidator.gettingBooksByTitle(req.query);
        let bookTitle = JSON.parse(req.query.title);
        redisClient.get('book' + bookTitle, async (err, result) => {
            if (err) {
                console.log("Redis Error", err);
                return res.status(500).send("Server Error");
            }
            if (result) {
                return res.status(200).json({ bookOfTitle: JSON.parse(result) });
            }
            else {
                let bookOfTitle = await books.getBooksByTitle(bookTitle);
                redisClient.set('book' + bookTitle, JSON.stringify(bookOfTitle));
                redisClient.expire('book' + bookTitle, 40);
                return res.status(200).json({ bookOfTitle });
            }
        })
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

module.exports = router;