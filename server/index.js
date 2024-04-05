const express = require("express");

const { MongoClient, ServerApiVersion } = require('mongodb');

const routes = require('./routes/routes');


const uri = "mongodb+srv://webserver:asdf1234@onlab.k1cnug0.mongodb.net/?retryWrites=true&w=majority&appName=Onlab";

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
      console.log("Successfully connected to MongoDB.");
      app.locals.db = client.db("teszt");
    } catch (err) {
      console.error("Failed to connect to MongoDB", err);
      process.exit(1);
    }
  }
  
  const PORT = process.env.PORT || 3000;
  const app = express();
  app.use(express.json());
  app.use('/api', routes);
  
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    run();
  });