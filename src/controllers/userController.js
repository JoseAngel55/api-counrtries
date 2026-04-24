const { createUser, findUser } = require("../services/userService");

async function register(req, res) {
    try {
        const { username, hash, provider } = req.body;

        if (!username) {
            return res.status(400).json({ error: "El username es requerido" });
        }

        const { user, created } = await createUser({
            username,
            hash,
            provider: provider ?? "local",
        });

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
        const { username, provider, hash } = req.query;

        if (!username) {
            return res.status(400).json({ error: "El username es requerido" });
        }

        const user = await findUser({ username, provider: provider ?? "local" });

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        if ((provider === "local" || !provider) && user.hash !== hash) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        res.json({ message: "Login exitoso", user });

    } catch (err) {
        console.error("Error en login:", err.message);
        res.status(404).json({ error: "Usuario no encontrado" });
    }
}

module.exports = { register, login };