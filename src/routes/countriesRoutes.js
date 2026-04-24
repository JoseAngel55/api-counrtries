const express = require("express");
const router = express.Router();
const { getCountries, getCountryByName } = require("../controllers/countryController");

router.get("/", getCountries);
router.get("/:name", getCountryByName);

module.exports = router;