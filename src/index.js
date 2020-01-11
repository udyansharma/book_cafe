const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const config = require('./config/config.json');

const authAPIs = require('./api/v1/auth.js');
const functionalAPIs = require('./api/v1/book.js');

const app = express();
const port = config.application.port;

app.use(cors());
app.use(helmet());
app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authAPIs);

app.use((req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        let token = req.headers.authorization.split(' ')[1];
        try {
            res.locals.loggedInUser = jwt.verify(token, config.application.signature).fetchedUser;
        }
        catch (err) {
            // console.log(err);
            if (err == "JsonWebTokenError: invalid token") {
                return res.status(400).send("Please Don't Try Playing With Our Tokens Man. We have A check for it");
            }
            if (err == "TokenExpiredError: jwt expired") {
                return res.status(400).send("Can You Please Login Again");
            }

        }
        next();
    }
    else {
        res.status(400).send("Who Are You? Mind Logging In Again Or SigninUp");
    }
})
app.use("/book", functionalAPIs);

app.use((req, res, next) => {
    res.status(404).send("You Took The Wrong Exit. No Such Endpoint");
});
app.listen(port, () => {
    console.log('Server started at port: ', port);
});