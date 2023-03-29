require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const exp = require("constants");
const db = require("./model/db");
const PORT = process.env.PORT || 3500;

db.connect((err, clients) => {
    if (err) console.log(err);
    clients.query('SELECT * FROM truck', [], (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res.rows[0])
        }
    })
});

db.query('SELECT * FROM TRUCK', [], (err, res) => {
    if (err) {
        console.log(err.stack)
    } else {
        console.log(res.rows[0])
    }
});

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ limit: "200mb", extended: false }));

// built-in middleware for json
app.use(express.json({ limit: "200mb" }));

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));
//app.use("/static", express.static(path.join(__dirname, "/transportapp/build/static")));

// routes
app.use("/", require("./routes/root"));
//app.use("/TransportApp/TransportData", require("./routes/api/transportjobs"));
//app.use("TransportApp", express.static(path.join(__dirname, "/views")));

app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ error: "404 Not Found" });
    } else {
        res.type("txt").send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
