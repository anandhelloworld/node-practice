import express from "express";
import { MongoClient } from "mongodb";
const app = express();
const PORT = 4000;



const MONGO_URL ="mongodb://127.0.0.1";

// Node - MongoDB
async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected ✌😊");
  return client;
}

const client = await createConnection();
app.use(express.json());

app.get("/", function (req, res) {
  res.send("welcome to movies server");
});

//creating a new movie
app.post("/movies", async function (req, res) {
  console.log("creating new movie");
  const data = req.body;
  const result = await client
    .db("firstdatabase")
    .collection("movies")
    .insertMany(data);
  res.send(result);
});

//getting movies by id
app.get("/movies/:id", async function (req, res) {
  console.log("getting movies by id", req.params.id)
  const {id}=req.params;
  console.log(id)
  const movie = await client
  .db("firstdatabase")
  .collection("movies")
  .find({id: id})
  .toArray();
  // console.log(movies)
  res.send(movie)
});


//getting all movies and also filtered 
app.get("/movies", async function (req, res) {
  console.log("all movies and filtered",req.query);
  if(req.query.rating){
    req.query.rating= +req.query.rating
  }
  const movies = await client
  .db("firstdatabase")
  .collection("movies")
  .find(req.query)
  .toArray();
  // console.log(movies)
  res.send(movies)
});



//deleting movie by id
app.delete("/movies/:id",async function (req, res) {
  console.log("deleting movie by id")
  const { id }=req.params;
  console.log(req.params.id)
  const result=await client
  .db("firstdatabase")
  .collection("movies")
  .deleteOne({id:id})
  console.log(result)

  result.deletedCount>0?res.status(200).send(result):res.status(404).send("no movie with")

})

//updating movie by id
app.put("/movies/:id",async function (req, res) {
  const data= req.body;
  const result=await client
  .db("firstdatabase")
  .collection("movies")
  .updateOne({id: id},{$set: data})
  res.send(result)
})



app.listen(PORT, () => {
  console.log("server started");
});

