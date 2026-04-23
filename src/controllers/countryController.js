const {fetchCountries} = require ('../services/countryService')

async function getCountries(req, res) {
    const data = await fetchCountries();
    res.json(data);
}

module.exports = {getCountries};