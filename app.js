const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const { getData } = require("./app_functions");

require("dotenv").config({ path: "secret.env" });

const app = express();

// setting view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// log requests
app.use(logger("dev"));

// use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
    getData()
        .then(response => {
            console.log(response);
        })
        .catch(err => next(err));
});

app.get("/search", (req, res) => {
    res.render("index", { title: "Post Search" });
});

app.use((req, res, next) => {
    const error = new Error("NOT FOUND");
    error.status = 404;
    next(error);
});

app.use((err, req, res) => {
    res.send(`${err.message} ${[err.status]}`);
});

//setting port
app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), err => {
    const message = err
        ? "Problem while running the application server"
        : `Server is running on port ${app.get("port")}`;
    console.log(message);
});
