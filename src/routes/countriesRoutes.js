const express = require("express");
const router = express.Router();
const { getCountries } = require("../controllers/countryController");

router.get("/countries", getCountries);

module.exports = router;