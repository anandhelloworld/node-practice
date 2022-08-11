//creating a new movie
app.post("/movies", async function (req, res) {
    const data = req.body;
    const result = await client
      .db("firstdatabase")
      .collection("movies")
      .insertMany(data);
    res.send(result);
  });
  
  //getting movies by id
  app.get("/movies/:id", async function (req, res) {
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
    console.log(req.query);
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
  
  //deleting movie
  app.delete("/movies/:id",async function (req, res) {
    const { id }=req.params;
    console.log(req.params.id)
    const result=await client
    .db("firstdatabase")
    .collection("movies")
    .deleteOne({id:id})
    console.log(result)
  
    result.deletedCount>0?res.status(200).send(result):res.status(404).send("no movie with")
  
  })
  
  //updating movie
  app.put("/movies/:id",async function (req, res) {
    const data= req.body;
    const result=await client
    .db("firstdatabase")
    .collection("movies")
    .updateOne(data)
    res.send(result)
  })
  