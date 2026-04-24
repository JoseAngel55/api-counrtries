const { createUser, findUser } = require("../services/userService");

async function register(req, res) {
    try {
        const { idUsuario, username, hash, provider } = req.body;

        if (!idUsuario || !username || !hash || !provider) {
            return res.status(400).json({ error: "Faltan campos requeridos" });
        }

        const { user, created } = await createUser({ idUsuario, username, hash, provider });

        if (!created) {
            return res.status(409).json({ message: "Usuario ya existe", user });
        }

        res.status(201).json({ message: "Usuario registrado", user });

    } catch (err) {
        console.error("Error en register:", err.message);
        res.status(500).json({ error: "Error al registrar usuario" });
    }
}

async function login(req, res) {
    try {
        const { idUsuario, provider } = req.query;

        if (!idUsuario || !provider) {
            return res.status(400).json({ error: "Faltan campos requeridos" });
        }

        const user = await findUser({ idUsuario, provider });

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario encontrado", user });

    } catch (err) {
        console.error("Error en login:", err.message);
        res.status(404).json({ error: "Usuario no encontrado" });
    }
}

module.exports = { register, login };