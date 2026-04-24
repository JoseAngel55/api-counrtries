const { seedCountries } = require("../services/seedService");

async function seed(req, res) {
    try {
        console.log("Iniciando carga de datos...");
        const result = await seedCountries();
        res.json({ message: "Carga completada", result });
    } catch (err) {
        console.error("Error en seed:", err.message);
        res.status(500).json({ error: "Error durante la carga de datos" });
    }
}

module.exports = { seed };