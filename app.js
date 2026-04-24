require("dotenv").config();
const express = require("express");
const countriesRoutes = require("./src/routes/countriesRoutes");
const seedRoutes = require("./src/routes/seedRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
app.use(express.json());

app.use("/countries", countriesRoutes);
app.use("/seed", seedRoutes);
app.use("/users", userRoutes);

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));