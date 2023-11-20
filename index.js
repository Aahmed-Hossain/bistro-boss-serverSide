const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app= express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// middle ware 
app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ukrdjza.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const menuCollection = client.db("bistroBossDB").collection("menu");
    const reviewsCollection = client.db("bistroBossDB").collection("reviews");
 
    app.get('/menu',async(req, res) =>{
      const result = await menuCollection.find().toArray();
      res.send(result)
    })
    app.get('/reviews',async(req, res) =>{
      const result = await reviewsCollection.find().toArray();
      res.send(result)
    })
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res)=> {
    res.send(`Boss is sitting`);
});
app.listen(port, ()=>{
    console.log(`Bistro Boss is sitting on Port/${port}`);
})