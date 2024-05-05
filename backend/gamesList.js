var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "team97_final";
const client = new MongoClient(url);
const db = client.db(dbName);

app.use(cors());
app.use(bodyParser.json());

const port = "8080";
const host = "localhost";

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

app.get("/games", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
        .collection("gamesList")
        .find(query)
        .limit(100)
        .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
});

app.get("/games/:id", async (req, res) => {
    const productid = Number(req.params.id);
    console.log("Game to find :", productid);
    await client.connect();

    console.log("Node connected successfully to GET-id MongoDB");

    const query = {"id": productid };
    const results = await db.collection("gamesList")
    .findOne(query);
    
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});
