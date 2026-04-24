require("dotenv").config();
const supabase = require("../../config/supabase");

async function fetchCountries() {
    const { data, error } = await supabase
        .from("countries")
        .select(`
            *,
            calling_codes(*),
            borders(*),
            currencies(*),
            languages(*)
        `);

    if (error) throw error;
    return data;
}

async function fetchCountryByName(name) {
    const { data, error } = await supabase
        .from("countries")
        .select(`
            *,
            calling_codes(*),
            borders(*),
            currencies(*),
            languages(*)
        `)
        .ilike("name", `%${name}%`);

    if (error) throw error;
    return data;
}

module.exports = { fetchCountries, fetchCountryByName };