const { fetchCountries, fetchCountryByName } = require("../services/countryService");

async function getCountries(req, res) {
    const data = await fetchCountries();
    res.json(data);
}

async function getCountryByName(req, res) {
    try {
        const { name } = req.params;
        const data = await fetchCountryByName(name);

        if (!data.length) {
            return res.status(404).json({ error: `No se encontró ningún país con el nombre '${name}'` });
        }

        res.json(data);
    } catch (err) {
        console.error("Error en getCountryByName:", err.message);
        res.status(500).json({ error: "Error al buscar el país" });
    }
}

module.exports = { getCountries, getCountryByName };