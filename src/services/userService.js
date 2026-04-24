require("dotenv").config();
const supabase = require("../../config/supabase");

async function createUser({ idUsuario, username, hash, provider }) {
    const { data: existing } = await supabase
        .from("users")
        .select("id")
        .eq("idUsuario", idUsuario)
        .eq("provider", provider)
        .single();

    if (existing) return { user: existing, created: false };

    const { data, error } = await supabase
        .from("users")
        .insert({ idUsuario, username, hash, provider })
        .select()
        .single();

    if (error) throw error;

    return { user: data, created: true };
}

async function findUser({ idUsuario, provider }) {
    const { data, error } = await supabase
        .from("users")
        .select()
        .eq("idUsuario", idUsuario)
        .eq("provider", provider)
        .single();

    if (error) throw error;

    return data;
}

module.exports = { createUser, findUser };