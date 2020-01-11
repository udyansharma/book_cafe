const router = require('express').Router();
const inputValidator = require('../../services/validations.js');
const books = require('../../services/books.js');

// Route To Publish Books
// Sorry Books FROM THANOS Not Allowed
router.post("/sellYourBookForGood", (req, res, next) => {

});

// Unpublish Your Book
router.post("/takeAwayAllTheGoodness", (req, res, next) => {

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