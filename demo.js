const { MongoClient } = require('mongodb');

const fs = require("fs");
const { parse } = require("csv-parse");

async function main() {
    const uri = "mongodb+srv://naftalifalkjudson:5pTFaRADxIxcNIN4@cluster0.jaoqgys.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        await client.connect();

        await readFile(client);


        
    } catch (error) {
        console.error(error);
    }
    
}

main().catch(console.error);

async function createStock(client, newStock) {
    const result = await client.db("StockTicker").collection("companies").insertOne(newStock);
    console.log("New insert's id: " + result.insertedId); 
}

async function readFile(client) {
    var stockData = [];
    await fs.createReadStream("./companies.csv")
            .pipe(parse({ delimeter: ",", from_line: 2 }))
            .on("data", function(row){
                stockData.push(row);
                createStock(client, {
                    companyName: row[0],
                    symbol: row[1],
                    price: row[2]
                })
            })
            .on("end", function() {
                console.log("finished");
            })
            .on("error", function(error) {
                console.log(error.message);
            });
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases: ");
    databasesList.databases.forEach(db => {
        console.log(db.name);
    })
}
