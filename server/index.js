const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
var history = require('connect-history-api-fallback');
const keys = process.env.NODE_ENV === "production" ? require('./prodKeys') : require('./config/keys');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const Promise = require('bluebird');

mongoose.connect(keys.mongoDB.dbURI, { useNewUrlParser: true, useFindAndModify: false }, () => {
    console.log("connected to mongodb");
});

const app = express();
app.use(history());
app.use(cors());

//middlewares
app.use(morgan('dev'));
app.use(express.static(__dirname));
app.use(bodyParser.json());

//routes  http://localhost:3000/users
app.use('/users', require('./routes/users'));
app.use('/chefs', require('./routes/chefs'));
// app.use('/recipes', require('./routes/recipes'));


if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("/*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

//start the server
const port = process.env.PORT || 5000;

app.listen(port);
console.log(`Server listening at port ${port}`);