const express = require("express");
const foods = require("./foods.json");
const app = express();
const port = 3000;

// Start the server
app.listen(port, () => console.log(`App is running on http://localhost:${port}`));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/foods", (req, res) => {
  res.json(foods);
});

// Routes
app.get("/foods", (req, res) => {
  res.json(foods);
});

app.get("/foods/:id", (req, res) => {
  const foodId = parseInt(req.params.id, 10);
  const food = foods.find((food) => food.id === foodId);

  if (food) {
    res.json(food);
  } else {
    res.status(404).json({ message: "Food not found" });
  }
});
