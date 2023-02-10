const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

//const DB_URL = "mongodb://127.0.0.1:27017";
const DB_URL = "mongodb+srv://admin:OguwCs6ZT6HzYc2f@cluster0.fkrzjt6.mongodb.net";
const DB_NAME = "ocean-bancoDados-09-02-23";

async function main() {
  console.log("Conectando com Banco de dados!");

  const client = await MongoClient.connect(DB_URL);
  const db = client.db(DB_NAME);
  const collection = db.collection('artistas');

  console.log("Banco de dados conectado com sucesso!");

  const app = express();

  // Definindo que tudo que vier no boby é JSON
  app.use(express.json());

  app.get("/", function (req, res) {
    res.send("Hello World");
  });
  app.get("/ola", function (req, res) {
    res.send('<h1 style="color:pink;">Olá, mundo!</h1>');
  });

  // Lista de informações
  const artistas = ['Taylor Swift', 'Christina Agulera', 'Tove Lo'];

  // CRUD

  // Read All [GET]/artista
  app.get ("/artista", async function (req, res) {
    const documentos = await collection.find().toArray();
    res.send(documentos);
  });

  //Read Single by ID [GET]/artista/:id
  app.get("/artista/:id", async function(req, res) {
    const id = req.params.id;
    const item = await collection.findOne({ _id: new ObjectId(id) })
    res.send(item.nome);
    console.log(item.nome);
  });

  // Create -> [POST]/item
  app.post("/artista", async function(req, res) {
    console.log(req.body);

    const newArtist = req.body;
    await collection.insertOne(newArtist)
    res.send(newArtist);
  });


  //Update -> [PUT]/:id
  app.put("/artista/:id", async function(req, res) {
    const id = req.params.id;
    const body = req.body;

    console.log(id, body);

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    res.send(body)
  });

  // DELETE - [DELETE] /item/:id


  app.listen(3000);
}

main();