const express = require("express");
const countriesRoutes = require("./src/routes/countriesRoutes");

const app = express();

app.use('/countries', countriesRoutes);

app.listen(3000, 
    () => 
        console.log("Server running on port 3000: http://localhost:3000/countries"));