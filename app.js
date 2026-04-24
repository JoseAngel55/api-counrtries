require("dotenv").config();
const express = require("express");
const countriesRoutes = require("./src/routes/countriesRoutes");
const seedRoutes = require("./src/routes/seedRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/countries", countriesRoutes);
app.use("/seed", seedRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));