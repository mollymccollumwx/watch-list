const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const app = express();

const PORT = process.env.PORT || 8080;

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Mickey19",
  database: "moviePlannerDB",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// VIEWS ROUTES
app.get("/", (req, res) => {
  //   res.send("All my movies will go here.");
  connection.query("SELECT * FROM movies", (err, data) => {
    if (err) throw err;
    console.log(data);
    res.render("index", { movies: data });
  });
});

app.get("/movies/new", (req, res) => {
  //   res.send("A form to create a new movie will go here.");
  res.render("new-movie");
});

app.get("/movies/:id", (req, res) => {
  //   res.send("A single movie will go here.");
  const movieId = req.params.id;

  connection.query(
    "SELECT * FROM movies WHERE id = ?",
    [movieId],
    (err, data) => {
      // console.log(data);
      res.render("single-movie", data[0]);
    }
  );
});

app.get("/movies/:id/edit", (req, res) => {
  const movieId = req.params.id;
  //   res.send("A form to update the movie will go here.");
  connection.query(
    "SELECT * FROM movies WHERE id = ?",
    [movieId],
    (err, data) => {
      res.render("edit-movie", data[0]);
    }
  );
});

// API ROUTES

app.post("/api/movies", (req, res) => {
  //   res.send(
  //     "After creating a new movie in the database, I will return a response."
  //   );
  connection.query(
    "INSERT INTO movies (movie) VALUES (?)",
    [req.body.movie],
    (err, result) => {
      res.json(result);
    }
  );
});

app.put("/api/movies/:id", (req, res) => {
  //   res.send("After updating a movie by ID, I will return a response");
  connection.query(
    "UPDATE movies SET movie = ? WHERE id = ?",
    [req.body.movie, req.params.id],
    (err, result) => {
      res.json(result);
    }
  );
});

app.delete("/api/movies/:id", (req, res) => {
  const movieId = req.params.id;
  //   res.send("After deleting a movie by ID, I will return a response.");
  connection.query(
    "DELETE FROM movies WHERE id = ?",
    [movieId],
    (err, result) => {
      res.json(result);
    }
  );
});

// LISTEN ON THE PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
