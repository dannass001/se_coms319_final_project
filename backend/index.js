var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms319_final_97";
const client = new MongoClient(url);
const db = client.db(dbName);

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

app.get("/video_games", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
        .collection("video_games")
        .find(query)
        .limit(100)
        .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
});

app.get("/video_games/:id", async (req, res) => {
    const productid = Number(req.params.id);
    console.log("Game to find :", productid);
    await client.connect();

    console.log("Node connected successfully to GET-id MongoDB");

    const query = {"id": productid };
    const results = await db.collection("video_games")
    .findOne(query);
    
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});

app.post("/video_games", async (req, res) => {
    try{
        await client.connect();
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);
        
        const newDocument = {
            "id": Number(values[0]), // also "id": req.body.id,
            "title": values[1], // also "name": req.body.name,
            "image": values[2],
        };
        console.log(newDocument);
        const results = await db
            .collection("video_games")
            .insertOne(newDocument);
        res.status(200);
        res.send(results);
    }catch(error){
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    }
});

app.delete("/video_games/:id", async (req, res) =>{
    try{
        const id = Number(req.params.id);
        await client.connect();
        console.log("Product to delete: ", id);
        const query = {id: id};
        const productDeleted = await db.collection("video_games")
        .findOne(query);

        const results = await db.collection("video_games").deleteOne(query);
        res.status(200);
        res.send(productDeleted);
    }catch(error){
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    }
});

app.put("/video_games/:id", async (req, res) => {
    const id = Number(req.params.id);
    const query = { id: id };
    await client.connect();
    console.log("Product to Update :",id);
    // Data for updating the document, typically comes from the request body
    console.log(req.body);
    const updateData = {
    $set:{
        "id": Number(req.body.id), 
        "title": req.body.title, 
        "image": req.body.image,
    }
    };
    // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
    const options = { };
    const results = await db.collection("video_games").updateOne(query, updateData, options);
    res.status(200);
    res.send(results);
});