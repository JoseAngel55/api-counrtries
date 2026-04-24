require("dotenv").config();
const supabase = require("../../config/supabase");

async function createUser({ username, hash, provider }) {
    const { data: existing } = await supabase
        .from("users")
        .select("id")
        .eq("username", username)
        .eq("provider", provider)
        .single();

    if (existing) return { user: existing, created: false };

    const { data, error } = await supabase
        .from("users")
        .insert({
            username,
            hash:     hash ?? null,
            provider: provider ?? "local",
        })
        .select()
        .single();

    if (error) throw error;
    return { user: data, created: true };
}

async function findUser({ username, provider }) {
    const { data, error } = await supabase
        .from("users")
        .select()
        .eq("username", username)
        .eq("provider", provider)
        .single();

    if (error) throw error;
    return data;
}

module.exports = { createUser, findUser };