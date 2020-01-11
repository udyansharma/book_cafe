const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const config = require('config/config.json');
const authAPIs = require('./api/v1/auth.js');

const app = express();
const port = config.port;

app.use(cors());
app.use(helmet());
app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authAPIs);

app.listen(port, () => {
    console.log('Server started at port: ', port);
});