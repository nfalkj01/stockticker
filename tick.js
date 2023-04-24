const express = require("express");
const { MongoClient } = require('mongodb');

const port = process.env.PORT || 3338;

const app  = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.sendfile("./index.html");
});

app.post("/", (req, res) => {
    
    const input = req.body.input;
    const which = req.body.namorsym;
    main(input, res, which).catch(console.error);

    
    
    
});

var server = app.listen(port, function () {
    console.log('Node server is running..');
});

async function main(input, res, which) {
    const uri = "mongodb+srv://naftalifalkjudson:5pTFaRADxIxcNIN4@cluster0.jaoqgys.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        await client.connect();
        
        var grab;
        if (which == "symbol"){
            var grab = await client.db("StockTicker").collection("companies").find(
                { symbol: input }
            );
        }
        else {
            var grab = await client.db("StockTicker").collection("companies").find(
                { name: input }
            );
        }

        console.log("here1");
        
        // const results = await grab.toArray();
        // var output = "";
        // await results.forEach(company => {
        //     output += "<div>Company Name: " + company["companyName"] + "</div><br>";
        //     output += "<div>Stock Symbol: " + company["symbol"] + "</div><br>";
        //     output += "<div>Price: " + company["price"] + "</div><br><br>";

        // });

        // if (output == ""){
        //     output = "Sorry, there was no data found";
        // }
        // await res.send(output);

        // console.log("here2");


        
    } catch (error) {
        console.error(error);
    }
    finally {
        await client.close();
    }
}

