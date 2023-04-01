require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const exp = require("constants");
const PORT = process.env.PORT || 3500;


async function databaselookup() {

    //use this for INSERT, UPDATE and DELETE - this supports transactions - YOU CAN DO MUTIPLE QUERIES IN ONE CONNECTION
    try {
        let client = await db.connect();

        let data1 = await client.query('SELECT * FROM truck');
        console.log(data1.rows[0]);
        client.release();
    }
    catch (err) {
        console.log(err.error);
    }

    //USE THIS FOR SELECTS - THIS USES ONE CONNECTION THEN RELEASES IT
    try {
        const data3 = await db.query('SELECT * FROM TRUCKs');
        console.log(data3.rows[0])
    } catch (err) {
        console.log(err);
    }
}

databaselookup();

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
