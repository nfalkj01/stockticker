const { MongoClient } = require('mongodb');

async function main(input) {
    const uri = "mongodb+srv://naftalifalkjudson:5pTFaRADxIxcNIN4@cluster0.jaoqgys.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        await client.connect();
        
        const grab = await client.db("StockTicker").collection("companies").find(
            { symbol: input }
        );

        const results = await grab.toArray();

        console.log(results);
        
        


        
    } catch (error) {
        console.error(error);
    }
    finally {
        await client.close;
    }
}

main("ADDDF").catch(console.error);