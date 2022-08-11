// app.get("/movies", function (req, res) {
//   //client.db("movies").
//   res.json(movies);
// });

// app.get("/movies/:id", function (req, res) {
//   const movie = movies.find((mv) => {
//     return mv.id == req.params.id;
//   });
//   movie ? res.status(200).send(movie) : res.status(404).send("no movie found");
// });
// //body->json

// app.get("/movies", async function (req, res) {
//   const movies = await client
//   .db("firstdatabase")
//   .collection("movies")
//   .find({})
//   .toArray();
//   console.log(movies)
//   res.send(movies)
// });